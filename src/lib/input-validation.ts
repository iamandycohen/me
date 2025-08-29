import { z } from 'zod';

// Configuration constants
const MAX_MESSAGE_LENGTH = 4000; // characters
const MAX_MESSAGES_PER_REQUEST = 50;
const MAX_REQUEST_SIZE = 100 * 1024; // 100KB
const MAX_TOOL_ARG_SIZE = 1000; // characters for individual tool arguments

// Message validation schema
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string()
    .min(1, 'Message content cannot be empty')
    .max(MAX_MESSAGE_LENGTH, `Message content cannot exceed ${MAX_MESSAGE_LENGTH} characters`)
    .refine(
      (content) => content.trim().length > 0,
      'Message content cannot be only whitespace'
    ),
});

// Chat request validation schema
export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema)
    .min(1, 'At least one message is required')
    .max(MAX_MESSAGES_PER_REQUEST, `Cannot exceed ${MAX_MESSAGES_PER_REQUEST} messages per request`)
    .refine(
      (messages) => {
        // Ensure reasonable message history size
        const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
        return totalLength <= MAX_REQUEST_SIZE;
      },
      `Total message content cannot exceed ${MAX_REQUEST_SIZE} characters`
    )
    .refine(
      (messages) => {
        // Validate message flow (should not have consecutive assistant messages)
        for (let i = 1; i < messages.length; i++) {
          if (messages[i].role === 'assistant' && messages[i-1].role === 'assistant') {
            return false;
          }
        }
        return true;
      },
      'Cannot have consecutive assistant messages'
    ),
});

// MCP tool arguments validation
export const McpToolArgsSchema = z.record(z.unknown()).refine(
  (args) => {
    // Check total size of serialized arguments
    const serialized = JSON.stringify(args);
    return serialized.length <= MAX_TOOL_ARG_SIZE;
  },
  `Tool arguments cannot exceed ${MAX_TOOL_ARG_SIZE} characters when serialized`
);

// Content sanitization function
export function sanitizeContent(content: string): string {
  return content
    .trim()
    // Remove potential XSS patterns (basic sanitization)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Limit excessive newlines
    .replace(/\n{3,}/g, '\n\n');
}

// Validation result types
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chat request validation function
export function validateChatRequest(body: unknown): ValidationResult<z.infer<typeof ChatRequestSchema>> {
  try {
    // First check if body exists and is an object
    if (!body || typeof body !== 'object') {
      return {
        success: false,
        error: 'Request body must be a valid JSON object'
      };
    }

    // Parse and validate with Zod
    const result = ChatRequestSchema.safeParse(body);
    
    if (!result.success) {
      const errorMessage = result.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('; ');
      
      return {
        success: false,
        error: `Validation failed: ${errorMessage}`
      };
    }

    // Sanitize message content
    const sanitizedMessages = result.data.messages.map(msg => ({
      ...msg,
      content: sanitizeContent(msg.content)
    }));

    return {
      success: true,
      data: {
        ...result.data,
        messages: sanitizedMessages
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid request format'
    };
  }
}

// MCP tool arguments validation function
export function validateMcpToolArgs(args: unknown): ValidationResult<Record<string, unknown>> {
  try {
    if (!args || typeof args !== 'object') {
      return {
        success: false,
        error: 'Tool arguments must be a valid object'
      };
    }

    const result = McpToolArgsSchema.safeParse(args);
    
    if (!result.success) {
      return {
        success: false,
        error: 'Tool arguments validation failed'
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid tool arguments format'
    };
  }
}

// Request size validation middleware
export function validateRequestSize(request: Request): ValidationResult<null> {
  const contentLength = request.headers.get('content-length');
  
  if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
    return {
      success: false,
      error: `Request size cannot exceed ${MAX_REQUEST_SIZE} bytes`
    };
  }

  return { success: true };
}
