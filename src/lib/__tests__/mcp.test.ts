// Mock the MCP SDK to avoid ES modules issues in Jest
jest.mock('../mcp-sdk', () => ({
  convertMcpToolToOpenAI: (mcpTool: any) => ({
    type: 'function',
    function: {
      name: mcpTool.name,
      description: mcpTool.description || `Calls the ${mcpTool.name} tool`,
      parameters: mcpTool.inputSchema || {
        type: 'object',
        properties: {},
        required: []
      }
    }
  })
}));

import { convertMcpToolToOpenAI } from '../mcp-sdk';
import { MCPTool } from '@/types';

describe('MCP Tool Utilities', () => {
  describe('convertMcpToolToOpenAI', () => {
    test('should convert basic MCP tool to OpenAI format', () => {
      const mcpTool: MCPTool = {
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
      const mcpTool: MCPTool = {
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
      const mcpTool: MCPTool = {
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
      const mcpTool: MCPTool = {
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

      expect((result as { function: { parameters: unknown } }).function.parameters).toEqual({
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
      const mcpTool: MCPTool = {
        name: 'empty_tool',
        description: 'A tool with empty schema',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      };

      const result = convertMcpToolToOpenAI(mcpTool);

      expect((result as { function: { parameters: unknown } }).function.parameters).toEqual({
        type: 'object',
        properties: {},
      });
    });
  });
});
