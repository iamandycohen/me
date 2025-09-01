/**
 * Unit tests for /api/docs route
 * Tests the OpenAPI specification generation functionality
 */

// Mock Next.js modules before importing anything
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      json: () => Promise.resolve(data),
      headers: new Map([['content-type', 'application/json']])
    }))
  }
}));

// Mock the data and data-helpers modules
jest.mock('@/lib/data', () => ({
  contact: {
    name: 'Test User',
    email: 'test@example.com',
    linkedin: 'linkedin.com/in/testuser'
  }
}));

jest.mock('@/lib/data-helpers', () => ({
  formatLinkedInUrl: jest.fn((url: string) => `https://${url}`)
}));

// Import after mocking
import { GET } from '../route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/docs route', () => {
  const mockNextResponse = NextResponse as jest.Mocked<typeof NextResponse>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('OpenAPI Specification Format', () => {
    test('should return valid OpenAPI 3.0 specification structure', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      
      expect(mockNextResponse.json).toHaveBeenCalledTimes(1);
      
      const spec = mockNextResponse.json.mock.calls[0][0];
      
      // Essential OpenAPI 3.0 structure
      expect(spec).toHaveProperty('openapi', '3.0.0');
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('paths');
      expect(spec).toHaveProperty('components');
      expect(spec).toHaveProperty('servers');
      expect(spec).toHaveProperty('tags');
    });

    test('should include proper metadata in info section', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      expect(spec.info.title).toBe('Test User - MCP Server API');
      expect(spec.info.version).toBe('1.0.0');
      expect(spec.info.description).toContain('Model Context Protocol');
      expect(spec.info.contact.name).toBe('Test User');
      expect(spec.info.contact.email).toBe('test@example.com');
      expect(spec.info.license.name).toBe('MIT');
    });
  });

  describe('API Representation Accuracy', () => {
    test('should document the actual MCP transport endpoints', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      // Should document the /api/mcp endpoint (main transport)
      expect(spec.paths).toHaveProperty('/api/mcp');
      
      // Should support both POST (main) and GET (SSE fallback)
      expect(spec.paths['/api/mcp']).toHaveProperty('post');
      expect(spec.paths['/api/mcp']).toHaveProperty('get');
    });

    test('should include server endpoints that match actual deployment', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      // Should have server definitions
      expect(spec.servers).toBeDefined();
      expect(Array.isArray(spec.servers)).toBe(true);
      expect(spec.servers.length).toBeGreaterThan(0);
      
      // Each server should have url and description
      spec.servers.forEach((server: any) => {
        expect(server).toHaveProperty('url');
        expect(server).toHaveProperty('description');
        expect(typeof server.url).toBe('string');
        expect(typeof server.description).toBe('string');
      });
    });

    test('should document MCP tools that match actual implementation', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      // Should have schemas section with tool definitions
      expect(spec.components).toHaveProperty('schemas');
      expect(spec.components.schemas).toBeDefined();
      
      // Should document available MCP tools (matches what's in /api/[transport])
      const schemas = spec.components.schemas;
      
      // Look for tool-related schemas (could be MCPTools or individual tool schemas)
      const hasToolDocumentation = 
        Object.keys(schemas).some(key => 
          key.toLowerCase().includes('tool') || 
          key.toLowerCase().includes('mcp') ||
          key.toLowerCase().includes('contact') ||
          key.toLowerCase().includes('bio') ||
          key.toLowerCase().includes('resume') ||
          key.toLowerCase().includes('project')
        );
      
      expect(hasToolDocumentation).toBe(true);
    });

    test('should document request/response formats for MCP protocol', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      const mcpPost = spec.paths['/api/mcp'].post;
      
      // Should document request format
      expect(mcpPost).toHaveProperty('requestBody');
      expect(mcpPost.requestBody).toHaveProperty('content');
      expect(mcpPost.requestBody.content).toHaveProperty('application/json');
      
      // Should document response formats
      expect(mcpPost).toHaveProperty('responses');
      expect(mcpPost.responses).toHaveProperty('200');
    });

    test('should include session management documentation', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      const spec = mockNextResponse.json.mock.calls[0][0] as any;
      
      // Should document session headers used by actual implementation
      const mcpPost = spec.paths['/api/mcp'].post;
      
      // Check for session-related parameters or headers
      const hasSessionDocumentation = 
        (mcpPost.parameters && mcpPost.parameters.some((p: any) => 
          p.name && p.name.toLowerCase().includes('session')
        )) ||
        spec.description?.includes('session') ||
        spec.info.description.includes('session');
      
      expect(hasSessionDocumentation).toBe(true);
    });
  });

  describe('Response Format', () => {
    test('should return JSON response', async () => {
      const mockRequest = {} as NextRequest;
      
      await GET(mockRequest);
      
      // Verify NextResponse.json was called (indicating JSON response)
      expect(mockNextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          openapi: '3.0.0'
        })
      );
    });

    test('should not throw errors during generation', async () => {
      const mockRequest = {} as NextRequest;
      
      await expect(GET(mockRequest)).resolves.not.toThrow();
    });
  });
});
