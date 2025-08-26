import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function createCorsHeaders(
  methods: string[] = ["GET", "POST", "OPTIONS"]
) {
  return {
    ...corsHeaders,
    "Access-Control-Allow-Methods": methods.join(", "),
  };
}

export function createErrorResponse(
  message: string,
  status: number = 500,
  customHeaders: Record<string, string> = {}
) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: { ...createCorsHeaders(), ...customHeaders },
    }
  );
}

export function createSuccessResponse(
  data: any,
  customHeaders: Record<string, string> = {}
) {
  return NextResponse.json(
    { success: true, data },
    {
      status: 200,
      headers: { ...createCorsHeaders(), ...customHeaders },
    }
  );
}

// MCP JSON-RPC 2.0 response helpers
export function createMcpResponse(
  result: any,
  id: string | number = 1,
  customHeaders: Record<string, string> = {}
) {
  const response = {
    jsonrpc: "2.0",
    id,
    result,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      ...createCorsHeaders(),
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
}

export function createMcpError(
  error: string,
  code: number = -32603,
  id: string | number = 1,
  customHeaders: Record<string, string> = {}
) {
  const response = {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message: error,
    },
  };

  return NextResponse.json(response, {
    status: 200, // MCP errors are still 200 OK with error in response
    headers: {
      ...createCorsHeaders(),
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
}

export function handleApiError(
  error: unknown,
  context: string = "API"
): NextResponse {
  console.error(`${context} error:`, error);

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return createErrorResponse(message, 500);
}

export function handleMcpError(
  error: unknown,
  context: string = "MCP",
  id: string | number = 1
): NextResponse {
  console.error(`${context} error:`, error);

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  const code =
    error instanceof Error && error.message.includes("not found")
      ? -32601
      : -32603;

  return createMcpError(message, code, id);
}

export function createOptionsResponse(
  methods: string[] = ["GET", "POST", "OPTIONS"]
) {
  return new Response(null, {
    status: 204,
    headers: createCorsHeaders(methods),
  });
}
