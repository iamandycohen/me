import {
  ChatRequestSchema,
  McpToolArgsSchema,
  sanitizeContent,
  validateChatRequest,
  validateMcpToolArgs,
  validateRequestSize
} from '../input-validation';

describe('Input Validation', () => {
  describe('sanitizeContent', () => {
    test('should remove script tags', () => {
      const maliciousContent = 'Hello <script>alert("xss")</script> world';
      expect(sanitizeContent(maliciousContent)).toBe('Hello world');
    });

    test('should remove javascript: protocol', () => {
      const maliciousContent = 'Click <a href="javascript:alert()">here</a>';
      expect(sanitizeContent(maliciousContent)).toBe('Click <a href="alert()">here</a>');
    });

    test('should remove event handlers', () => {
      const maliciousContent = 'Click <div onclick="alert()">here</div>';
      expect(sanitizeContent(maliciousContent)).toBe('Click <div "alert()">here</div>');
    });

    test('should normalize whitespace', () => {
      const messyContent = '  Hello    world  \t\n  ';
      expect(sanitizeContent(messyContent)).toBe('Hello world');
    });

    test('should limit excessive newlines', () => {
      const content = 'Line 1\n\n\n\n\nLine 2';
      expect(sanitizeContent(content)).toBe('Line 1 Line 2');
    });

    test('should handle empty content', () => {
      expect(sanitizeContent('')).toBe('');
      expect(sanitizeContent('   ')).toBe('');
    });

    test('should handle normal content unchanged', () => {
      const normalContent = 'This is normal content with <b>bold</b> text.';
      expect(sanitizeContent(normalContent)).toBe('This is normal content with <b>bold</b> text.');
    });
  });

  describe('validateChatRequest', () => {
    test('should validate correct chat request', () => {
      const validRequest = {
        messages: [
          { role: 'user' as const, content: 'Hello' },
          { role: 'assistant' as const, content: 'Hi there!' }
        ]
      };

      const result = validateChatRequest(validRequest);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.messages).toHaveLength(2);
    });

    test('should reject null or undefined body', () => {
      expect(validateChatRequest(null).success).toBe(false);
      expect(validateChatRequest(undefined).success).toBe(false);
      expect(validateChatRequest(null).error).toContain('valid JSON object');
    });

    test('should reject non-object body', () => {
      expect(validateChatRequest('string').success).toBe(false);
      expect(validateChatRequest(123).success).toBe(false);
      expect(validateChatRequest([]).success).toBe(false);
    });

    test('should reject missing messages', () => {
      const result = validateChatRequest({});
      expect(result.success).toBe(false);
      expect(result.error).toContain('Validation failed');
    });

    test('should reject empty messages array', () => {
      const result = validateChatRequest({ messages: [] });
      expect(result.success).toBe(false);
      expect(result.error).toContain('At least one message is required');
    });

    test('should reject invalid message role', () => {
      const invalidRequest = {
        messages: [{ role: 'invalid', content: 'Hello' }]
      };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
    });

    test('should reject empty message content', () => {
      const invalidRequest = {
        messages: [{ role: 'user' as const, content: '' }]
      };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
    });

    test('should reject whitespace-only content', () => {
      const invalidRequest = {
        messages: [{ role: 'user' as const, content: '   \n\t  ' }]
      };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
    });

    test('should reject too long message content', () => {
      const longContent = 'a'.repeat(5000); // Over 4000 character limit
      const invalidRequest = {
        messages: [{ role: 'user' as const, content: longContent }]
      };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('cannot exceed 4000 characters');
    });

    test('should reject too many messages', () => {
      const tooManyMessages = Array(51).fill(0).map((_, i) => ({
        role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
        content: `Message ${i}`
      }));
      const invalidRequest = { messages: tooManyMessages };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot exceed 50 messages');
    });

    test('should reject consecutive assistant messages', () => {
      const invalidRequest = {
        messages: [
          { role: 'user' as const, content: 'Hello' },
          { role: 'assistant' as const, content: 'Hi' },
          { role: 'assistant' as const, content: 'How are you?' }
        ]
      };
      const result = validateChatRequest(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('consecutive assistant messages');
    });

    test('should sanitize message content', () => {
      const requestWithXSS = {
        messages: [
          { role: 'user' as const, content: 'Hello <script>alert("xss")</script>' }
        ]
      };
      const result = validateChatRequest(requestWithXSS);
      expect(result.success).toBe(true);
      expect(result.data?.messages[0].content).toBe('Hello ');
    });

    test('should handle JSON parsing errors', () => {
      // This simulates a malformed request that can't be parsed
      const result = validateChatRequest(Symbol('invalid'));
      expect(result.success).toBe(false);
      expect(result.error).toBe('Request body must be a valid JSON object');
    });
  });

  describe('validateMcpToolArgs', () => {
    test('should validate correct tool arguments', () => {
      const validArgs = { param1: 'value1', param2: 42 };
      const result = validateMcpToolArgs(validArgs);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validArgs);
    });

    test('should reject null or undefined args', () => {
      expect(validateMcpToolArgs(null).success).toBe(false);
      expect(validateMcpToolArgs(undefined).success).toBe(false);
    });

    test('should reject non-object args', () => {
      expect(validateMcpToolArgs('string').success).toBe(false);
      expect(validateMcpToolArgs(123).success).toBe(false);
      expect(validateMcpToolArgs([]).success).toBe(false);
    });

    test('should reject args that are too large when serialized', () => {
      const largeArgs = { data: 'x'.repeat(1500) }; // Over 1000 character limit
      const result = validateMcpToolArgs(largeArgs);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Tool arguments validation failed');
    });

    test('should accept empty object', () => {
      const result = validateMcpToolArgs({});
      expect(result.success).toBe(true);
      expect(result.data).toEqual({});
    });

    test('should handle complex nested objects', () => {
      const complexArgs = {
        config: { enabled: true, count: 5 },
        items: ['item1', 'item2'],
        metadata: { created: '2023-01-01', tags: ['tag1'] }
      };
      const result = validateMcpToolArgs(complexArgs);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(complexArgs);
    });
  });

  describe('validateRequestSize', () => {
    test('should accept requests within size limit', () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('1024') // 1KB
        }
      } as unknown as Request;

      const result = validateRequestSize(mockRequest);
      expect(result.success).toBe(true);
    });

    test('should reject requests exceeding size limit', () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('200000') // 200KB, over 100KB limit
        }
      } as unknown as Request;

      const result = validateRequestSize(mockRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('cannot exceed 102400 bytes');
    });

    test('should accept requests without content-length header', () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      } as unknown as Request;

      const result = validateRequestSize(mockRequest);
      expect(result.success).toBe(true);
    });

    test('should handle invalid content-length header', () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('not-a-number')
        }
      } as unknown as Request;

      const result = validateRequestSize(mockRequest);
      expect(result.success).toBe(true); // parseInt('not-a-number') returns NaN, which is falsy
    });
  });

  describe('Schema validation', () => {
    test('ChatRequestSchema should validate message structure', () => {
      const validData = {
        messages: [
          { role: 'user', content: 'Hello world' }
        ]
      };
      const result = ChatRequestSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('McpToolArgsSchema should validate tool arguments', () => {
      const validArgs = { param: 'value' };
      const result = McpToolArgsSchema.safeParse(validArgs);
      expect(result.success).toBe(true);
    });

    test('McpToolArgsSchema should reject oversized arguments', () => {
      const oversizedArgs = { data: 'x'.repeat(2000) };
      const result = McpToolArgsSchema.safeParse(oversizedArgs);
      expect(result.success).toBe(false);
    });
  });
});
