import { convertMcpToolToOpenAI, type McpTool } from '../mcp';

describe('MCP Tool Utilities', () => {
  describe('convertMcpToolToOpenAI', () => {
    test('should convert basic MCP tool to OpenAI format', () => {
      const mcpTool: McpTool = {
        name: 'test_tool',
        description: 'A test tool',
        inputSchema: {
          type: 'object',
          properties: {
            param1: { type: 'string' },
            param2: { type: 'number' },
          },
          required: ['param1'],
        },
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect(result).toEqual({
        type: 'function',
        function: {
          name: 'test_tool',
          description: 'A test tool',
          parameters: {
            type: 'object',
            properties: {
              param1: { type: 'string' },
              param2: { type: 'number' },
            },
            required: ['param1'],
          },
        },
      });
    });

    test('should handle MCP tool without inputSchema', () => {
      const mcpTool: McpTool = {
        name: 'simple_tool',
        description: 'A simple tool without parameters',
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect(result).toEqual({
        type: 'function',
        function: {
          name: 'simple_tool',
          description: 'A simple tool without parameters',
          parameters: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
      });
    });

    test('should handle MCP tool without description', () => {
      const mcpTool: McpTool = {
        name: 'undescribed_tool',
        inputSchema: {
          type: 'object',
          properties: {
            value: { type: 'string' },
          },
        },
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect(result).toEqual({
        type: 'function',
        function: {
          name: 'undescribed_tool',
          description: 'Calls the undescribed_tool tool',
          parameters: {
            type: 'object',
            properties: {
              value: { type: 'string' },
            },
          },
        },
      });
    });

    test('should handle complex schema with nested objects', () => {
      const mcpTool: McpTool = {
        name: 'complex_tool',
        description: 'A tool with complex parameters',
        inputSchema: {
          type: 'object',
          properties: {
            config: {
              type: 'object',
              properties: {
                enabled: { type: 'boolean' },
                count: { type: 'number', minimum: 1, maximum: 100 },
              },
              required: ['enabled'],
            },
            items: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['config'],
        },
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect((result as any).function.parameters).toEqual({
        type: 'object',
        properties: {
          config: {
            type: 'object',
            properties: {
              enabled: { type: 'boolean' },
              count: { type: 'number', minimum: 1, maximum: 100 },
            },
            required: ['enabled'],
          },
          items: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['config'],
      });
    });

    test('should handle empty inputSchema', () => {
      const mcpTool: McpTool = {
        name: 'empty_tool',
        description: 'A tool with empty schema',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect((result as any).function.parameters).toEqual({
        type: 'object',
        properties: {},
      });
    });
  });
});
