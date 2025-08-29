import { NextResponse } from 'next/server';

// Error types for categorization
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR', 
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
}

// Error response interface
export interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
  timestamp: string;
  requestId?: string;
}

// Safe error messages that don't leak internal information
const SAFE_ERROR_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.VALIDATION]: 'Invalid request data provided',
  [ErrorType.AUTHENTICATION]: 'Authentication failed',
  [ErrorType.AUTHORIZATION]: 'Access denied',
  [ErrorType.RATE_LIMIT]: 'Too many requests. Please try again later',
  [ErrorType.EXTERNAL_SERVICE]: 'External service temporarily unavailable',
  [ErrorType.INTERNAL]: 'An internal error occurred',
  [ErrorType.NOT_FOUND]: 'Resource not found',
};

// HTTP status codes for error types
const ERROR_STATUS_CODES: Record<ErrorType, number> = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.RATE_LIMIT]: 429,
  [ErrorType.EXTERNAL_SERVICE]: 503,
  [ErrorType.INTERNAL]: 500,
  [ErrorType.NOT_FOUND]: 404,
};

// Generate a simple request ID for tracking
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Secure error handler that prevents information disclosure
export function createSecureError(
  errorType: ErrorType,
  originalError?: Error | unknown,
  userMessage?: string,
  details?: string
): NextResponse {
  const requestId = generateRequestId();
  
  // Log detailed error server-side only (never sent to client)
  const logDetails = {
    requestId,
    errorType,
    timestamp: new Date().toISOString(),
    originalError: originalError instanceof Error 
      ? { name: originalError.name, message: originalError.message, stack: originalError.stack }
      : originalError,
    userAgent: 'unknown', // Would be populated by middleware if needed
  };
  
  // Log for debugging (server-side only)
  console.error(`[${errorType}] Request ${requestId}:`, logDetails);
  
  // Create safe response (no internal details)
  const errorResponse: ErrorResponse = {
    error: userMessage || SAFE_ERROR_MESSAGES[errorType],
    code: errorType,
    timestamp: new Date().toISOString(),
    requestId,
    ...(details && process.env.NODE_ENV === 'development' && { details }), // Only in development
  };
  
  return NextResponse.json(
    errorResponse,
    { status: ERROR_STATUS_CODES[errorType] }
  );
}

// Helper for handling OpenAI API errors specifically
export function handleOpenAIError(error: unknown): NextResponse {
  // OpenAI errors can contain sensitive information, so we categorize them safely
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status;
    
    if (status === 401) {
      return createSecureError(ErrorType.AUTHENTICATION, error, 'API authentication failed');
    } else if (status === 403) {
      return createSecureError(ErrorType.AUTHORIZATION, error, 'API access forbidden');
    } else if (status === 429) {
      return createSecureError(ErrorType.RATE_LIMIT, error, 'API rate limit exceeded');
    } else if (status >= 500) {
      return createSecureError(ErrorType.EXTERNAL_SERVICE, error, 'AI service temporarily unavailable');
    }
  }
  
  // Default to internal error for unknown OpenAI errors
  return createSecureError(ErrorType.EXTERNAL_SERVICE, error);
}

// Helper for handling MCP errors
export function handleMCPError(error: unknown): NextResponse {
  return createSecureError(
    ErrorType.EXTERNAL_SERVICE, 
    error, 
    'Profile service temporarily unavailable'
  );
}

// Stream-safe error for SSE responses
export function createStreamError(errorType: ErrorType, originalError?: unknown): string {
  const requestId = generateRequestId();
  
  // Log server-side
  console.error(`[STREAM_${errorType}] Request ${requestId}:`, {
    errorType,
    originalError: originalError instanceof Error 
      ? { message: originalError.message }
      : originalError,
    timestamp: new Date().toISOString(),
  });
  
  // Return safe stream error
  return `data: ${JSON.stringify({ 
    error: SAFE_ERROR_MESSAGES[errorType],
    code: errorType,
    requestId,
    timestamp: new Date().toISOString(),
  })}\n\n`;
}

// Validation error helper
export function createValidationError(message: string, details?: string): NextResponse {
  return createSecureError(ErrorType.VALIDATION, undefined, message, details);
}
