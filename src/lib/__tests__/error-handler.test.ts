import { NextResponse } from 'next/server';
import {
  ErrorType,
  createSecureError,
  handleOpenAIError,
  handleMCPError,
  createStreamError,
  createValidationError
} from '../error-handler';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, config) => ({ data, config }))
  }
}));

// Mock console.error to avoid cluttering test output
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('Error Handler', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
    mockConsoleError.mockRestore();
  });

  describe('createSecureError', () => {
    test('should create secure error response with default message', () => {
      createSecureError(ErrorType.VALIDATION);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Invalid request data provided',
          code: 'VALIDATION_ERROR',
          timestamp: expect.any(String),
          requestId: expect.any(String)
        }),
        { status: 400 }
      );
    });

    test('should use custom user message when provided', () => {
      const customMessage = 'Custom validation error';
      createSecureError(ErrorType.VALIDATION, undefined, customMessage);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: customMessage,
          code: 'VALIDATION_ERROR'
        }),
        { status: 400 }
      );
    });

    test('should include details in development mode', () => {
      process.env.NODE_ENV = 'development';
      const details = 'Detailed error information';
      
      createSecureError(ErrorType.INTERNAL, undefined, undefined, details);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          details: details
        }),
        { status: 500 }
      );
    });

    test('should not include details in production mode', () => {
      process.env.NODE_ENV = 'production';
      const details = 'Sensitive information';
      
      createSecureError(ErrorType.INTERNAL, undefined, undefined, details);
      
      const callArgs = (NextResponse.json as jest.Mock).mock.calls[0][0];
      expect(callArgs).not.toHaveProperty('details');
    });

    test('should log error details server-side', () => {
      const originalError = new Error('Original error');
      
      createSecureError(ErrorType.INTERNAL, originalError);
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/\[INTERNAL_ERROR\] Request \w+:/),
        expect.objectContaining({
          errorType: 'INTERNAL_ERROR',
          originalError: expect.objectContaining({
            name: 'Error',
            message: 'Original error',
            stack: expect.any(String)
          })
        })
      );
    });

    test('should handle non-Error original errors', () => {
      const originalError = 'String error';
      
      createSecureError(ErrorType.EXTERNAL_SERVICE, originalError);
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/\[EXTERNAL_SERVICE_ERROR\]/),
        expect.objectContaining({
          originalError: 'String error'
        })
      );
    });

    test('should return correct status codes for different error types', () => {
      const errorTests = [
        { type: ErrorType.VALIDATION, expectedStatus: 400 },
        { type: ErrorType.AUTHENTICATION, expectedStatus: 401 },
        { type: ErrorType.AUTHORIZATION, expectedStatus: 403 },
        { type: ErrorType.NOT_FOUND, expectedStatus: 404 },
        { type: ErrorType.RATE_LIMIT, expectedStatus: 429 },
        { type: ErrorType.INTERNAL, expectedStatus: 500 },
        { type: ErrorType.EXTERNAL_SERVICE, expectedStatus: 503 }
      ];

      errorTests.forEach(({ type, expectedStatus }) => {
        jest.clearAllMocks();
        createSecureError(type);
        
        expect(NextResponse.json).toHaveBeenCalledWith(
          expect.any(Object),
          { status: expectedStatus }
        );
      });
    });
  });

  describe('handleOpenAIError', () => {
    test('should handle 401 authentication error', () => {
      const error = { status: 401 };
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'API authentication failed',
          code: 'AUTHENTICATION_ERROR'
        }),
        { status: 401 }
      );
    });

    test('should handle 403 authorization error', () => {
      const error = { status: 403 };
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'API access forbidden',
          code: 'AUTHORIZATION_ERROR'
        }),
        { status: 403 }
      );
    });

    test('should handle 429 rate limit error', () => {
      const error = { status: 429 };
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'API rate limit exceeded',
          code: 'RATE_LIMIT_ERROR'
        }),
        { status: 429 }
      );
    });

    test('should handle 500+ server errors', () => {
      const error = { status: 502 };
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'AI service temporarily unavailable',
          code: 'EXTERNAL_SERVICE_ERROR'
        }),
        { status: 503 }
      );
    });

    test('should handle errors without status as external service error', () => {
      const error = new Error('Unknown error');
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'EXTERNAL_SERVICE_ERROR'
        }),
        { status: 503 }
      );
    });

    test('should handle errors with non-standard status codes', () => {
      const error = { status: 418 }; // I'm a teapot
      
      handleOpenAIError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'EXTERNAL_SERVICE_ERROR'
        }),
        { status: 503 }
      );
    });
  });

  describe('handleMCPError', () => {
    test('should always return external service error', () => {
      const error = new Error('MCP connection failed');
      
      handleMCPError(error);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Profile service temporarily unavailable',
          code: 'EXTERNAL_SERVICE_ERROR'
        }),
        { status: 503 }
      );
    });

    test('should handle any type of error', () => {
      handleMCPError('string error');
      handleMCPError({ custom: 'object' });
      handleMCPError(null);
      
      // All should result in the same external service error
      expect(NextResponse.json).toHaveBeenCalledTimes(3);
      (NextResponse.json as jest.Mock).mock.calls.forEach(call => {
        expect(call[0]).toMatchObject({
          error: 'Profile service temporarily unavailable',
          code: 'EXTERNAL_SERVICE_ERROR'
        });
        expect(call[1]).toEqual({ status: 503 });
      });
    });
  });

  describe('createStreamError', () => {
    test('should return formatted stream error string', () => {
      const errorString = createStreamError(ErrorType.RATE_LIMIT);
      
      expect(errorString).toMatch(/^data: /);
      expect(errorString).toMatch(/\n\n$/);
      
      // Parse the JSON part
      const jsonPart = errorString.replace('data: ', '').replace('\n\n', '');
      const errorData = JSON.parse(jsonPart);
      
      expect(errorData).toMatchObject({
        error: 'Too many requests. Please try again later',
        code: 'RATE_LIMIT_ERROR',
        requestId: expect.any(String),
        timestamp: expect.any(String)
      });
    });

    test('should log error server-side', () => {
      const originalError = new Error('Stream error');
      
      createStreamError(ErrorType.INTERNAL, originalError);
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/\[STREAM_INTERNAL_ERROR\]/),
        expect.objectContaining({
          errorType: 'INTERNAL_ERROR',
          originalError: { message: 'Stream error' },
          timestamp: expect.any(String)
        })
      );
    });

    test('should handle non-Error original errors', () => {
      createStreamError(ErrorType.VALIDATION, 'validation failed');
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/\[STREAM_VALIDATION_ERROR\]/),
        expect.objectContaining({
          originalError: 'validation failed'
        })
      );
    });
  });

  describe('createValidationError', () => {
    test('should create validation error with custom message', () => {
      const message = 'Field is required';
      
      createValidationError(message);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: message,
          code: 'VALIDATION_ERROR'
        }),
        { status: 400 }
      );
    });

    test('should include details when provided', () => {
      const message = 'Validation failed';
      const details = 'Email format is invalid';
      
      createValidationError(message, details);
      
      // The details should be passed to createSecureError
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/\[VALIDATION_ERROR\]/),
        expect.any(Object)
      );
    });
  });

  describe('request ID generation', () => {
    test('should generate unique request IDs', () => {
      createSecureError(ErrorType.INTERNAL);
      createSecureError(ErrorType.VALIDATION);
      
      const calls = (NextResponse.json as jest.Mock).mock.calls;
      const requestId1 = calls[0][0].requestId;
      const requestId2 = calls[1][0].requestId;
      
      expect(requestId1).toBeDefined();
      expect(requestId2).toBeDefined();
      expect(requestId1).not.toBe(requestId2);
      expect(typeof requestId1).toBe('string');
      expect(requestId1.length).toBeGreaterThan(0);
    });
  });

  describe('timestamp formatting', () => {
    test('should use ISO timestamp format', () => {
      const mockDate = '2023-01-01T12:00:00.000Z';
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);
      
      createSecureError(ErrorType.INTERNAL);
      
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          timestamp: mockDate
        }),
        expect.any(Object)
      );
      
      Date.prototype.toISOString.mockRestore();
    });
  });
});
