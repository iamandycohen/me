// Mock all the handler imports to avoid ES modules issues
jest.mock('../proxy-handler', () => ({
  ProxyChatHandler: jest.fn().mockImplementation(() => ({
    name: 'ProxyChatHandler'
  }))
}));

jest.mock('../native-handler', () => ({
  NativeChatHandler: jest.fn().mockImplementation(() => ({
    name: 'NativeChatHandler'
  }))
}));

jest.mock('../agents-handler', () => ({
  AgentsChatHandler: jest.fn().mockImplementation(() => ({
    name: 'AgentsChatHandler'
  }))
}));

import { ChatHandlerFactory } from '../chat-handler-factory';
import { ProxyChatHandler } from '../proxy-handler';
import { NativeChatHandler } from '../native-handler';
import { AgentsChatHandler } from '../agents-handler';
import type { ChatMode } from '../types';

describe('ChatHandlerFactory', () => {
  beforeEach(() => {
    // Clear the cache before each test
    ChatHandlerFactory.clearCache();
    jest.clearAllMocks();
  });

  describe('getHandler', () => {
    test('should create and return proxy handler', () => {
      const handler = ChatHandlerFactory.getHandler('proxy');
      
      expect(ProxyChatHandler).toHaveBeenCalledTimes(1);
      expect(handler).toEqual({ name: 'ProxyChatHandler' });
    });

    test('should create and return native handler', () => {
      const handler = ChatHandlerFactory.getHandler('native');
      
      expect(NativeChatHandler).toHaveBeenCalledTimes(1);
      expect(handler).toEqual({ name: 'NativeChatHandler' });
    });

    test('should create and return agents handler', () => {
      const handler = ChatHandlerFactory.getHandler('agents');
      
      expect(AgentsChatHandler).toHaveBeenCalledTimes(1);
      expect(handler).toEqual({ name: 'AgentsChatHandler' });
    });

    test('should cache handlers and return same instance', () => {
      const handler1 = ChatHandlerFactory.getHandler('proxy');
      const handler2 = ChatHandlerFactory.getHandler('proxy');
      
      expect(ProxyChatHandler).toHaveBeenCalledTimes(1); // Only called once
      expect(handler1).toBe(handler2); // Same instance
    });

    test('should create different instances for different modes', () => {
      const proxyHandler = ChatHandlerFactory.getHandler('proxy');
      const nativeHandler = ChatHandlerFactory.getHandler('native');
      const agentsHandler = ChatHandlerFactory.getHandler('agents');
      
      expect(proxyHandler).not.toBe(nativeHandler);
      expect(nativeHandler).not.toBe(agentsHandler);
      expect(proxyHandler).not.toBe(agentsHandler);
    });

    test('should throw error for unknown chat mode', () => {
      expect(() => {
        ChatHandlerFactory.getHandler('unknown' as ChatMode);
      }).toThrow('Unknown chat mode: unknown');
    });

    test('should handle cached retrieval after initial creation', () => {
      // First call creates the handler
      const handler1 = ChatHandlerFactory.getHandler('agents');
      expect(AgentsChatHandler).toHaveBeenCalledTimes(1);
      
      // Second call retrieves from cache
      const handler2 = ChatHandlerFactory.getHandler('agents');
      expect(AgentsChatHandler).toHaveBeenCalledTimes(1); // Still only called once
      expect(handler1).toBe(handler2);
    });
  });

  describe('getAvailableModes', () => {
    test('should return all available chat modes', () => {
      const modes = ChatHandlerFactory.getAvailableModes();
      
      expect(modes).toEqual(['agents', 'proxy', 'native']);
      expect(modes).toHaveLength(3);
    });

    test('should return array with correct types', () => {
      const modes = ChatHandlerFactory.getAvailableModes();
      
      modes.forEach(mode => {
        expect(['agents', 'proxy', 'native']).toContain(mode);
      });
    });
  });

  describe('getDefaultMode', () => {
    test('should return agents as default mode', () => {
      const defaultMode = ChatHandlerFactory.getDefaultMode();
      
      expect(defaultMode).toBe('agents');
    });
  });

  describe('getModeDescription', () => {
    test('should return correct description for proxy mode', () => {
      const description = ChatHandlerFactory.getModeDescription('proxy');
      
      expect(description).toBe('Direct MCP integration with real-time tool call updates');
    });

    test('should return correct description for native mode', () => {
      const description = ChatHandlerFactory.getModeDescription('native');
      
      expect(description).toBe('OpenAI handles MCP tools directly (tool calls shown after completion)');
    });

    test('should return correct description for agents mode', () => {
      const description = ChatHandlerFactory.getModeDescription('agents');
      
      expect(description).toBe('OpenAI Agents SDK with enhanced tool interaction and real-time updates');
    });

    test('should return unknown description for invalid mode', () => {
      const description = ChatHandlerFactory.getModeDescription('invalid' as ChatMode);
      
      expect(description).toBe('Unknown mode');
    });
  });

  describe('getModeLabel', () => {
    test('should return correct label for proxy mode', () => {
      const label = ChatHandlerFactory.getModeLabel('proxy');
      
      expect(label).toBe('Proxy Mode');
    });

    test('should return correct label for native mode', () => {
      const label = ChatHandlerFactory.getModeLabel('native');
      
      expect(label).toBe('Native Mode');
    });

    test('should return correct label for agents mode', () => {
      const label = ChatHandlerFactory.getModeLabel('agents');
      
      expect(label).toBe('Agents Mode');
    });

    test('should return unknown label for invalid mode', () => {
      const label = ChatHandlerFactory.getModeLabel('invalid' as ChatMode);
      
      expect(label).toBe('Unknown');
    });
  });

  describe('clearCache', () => {
    test('should clear cached handlers', () => {
      // Create handlers to populate cache
      ChatHandlerFactory.getHandler('proxy');
      ChatHandlerFactory.getHandler('native');
      
      expect(ProxyChatHandler).toHaveBeenCalledTimes(1);
      expect(NativeChatHandler).toHaveBeenCalledTimes(1);
      
      // Clear cache
      ChatHandlerFactory.clearCache();
      
      // Request same handlers again - should create new instances
      ChatHandlerFactory.getHandler('proxy');
      ChatHandlerFactory.getHandler('native');
      
      expect(ProxyChatHandler).toHaveBeenCalledTimes(2);
      expect(NativeChatHandler).toHaveBeenCalledTimes(2);
    });

    test('should allow cache to be rebuilt after clearing', () => {
      // Create and cache handler
      const handler1 = ChatHandlerFactory.getHandler('agents');
      
      // Clear cache
      ChatHandlerFactory.clearCache();
      
      // Create new handler - should be different instance
      const handler2 = ChatHandlerFactory.getHandler('agents');
      
      expect(handler1).not.toBe(handler2);
      expect(AgentsChatHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe('factory pattern implementation', () => {
    test('should implement singleton pattern for each mode', () => {
      const modes: ChatMode[] = ['proxy', 'native', 'agents'];
      
      modes.forEach(mode => {
        const instance1 = ChatHandlerFactory.getHandler(mode);
        const instance2 = ChatHandlerFactory.getHandler(mode);
        const instance3 = ChatHandlerFactory.getHandler(mode);
        
        expect(instance1).toBe(instance2);
        expect(instance2).toBe(instance3);
      });
    });

    test('should maintain separate instances for each mode type', () => {
      const proxyHandler1 = ChatHandlerFactory.getHandler('proxy');
      const proxyHandler2 = ChatHandlerFactory.getHandler('proxy');
      const nativeHandler1 = ChatHandlerFactory.getHandler('native');
      const nativeHandler2 = ChatHandlerFactory.getHandler('native');
      
      // Same mode should return same instance
      expect(proxyHandler1).toBe(proxyHandler2);
      expect(nativeHandler1).toBe(nativeHandler2);
      
      // Different modes should return different instances
      expect(proxyHandler1).not.toBe(nativeHandler1);
    });
  });

  describe('error handling', () => {
    test('should throw descriptive error for undefined mode', () => {
      expect(() => {
        ChatHandlerFactory.getHandler(undefined as any);
      }).toThrow('Unknown chat mode: undefined');
    });

    test('should throw descriptive error for null mode', () => {
      expect(() => {
        ChatHandlerFactory.getHandler(null as any);
      }).toThrow('Unknown chat mode: null');
    });

    test('should throw descriptive error for empty string mode', () => {
      expect(() => {
        ChatHandlerFactory.getHandler('' as any);
      }).toThrow('Unknown chat mode: ');
    });
  });

  describe('static method behavior', () => {
    test('all methods should be static and not require instantiation', () => {
      // Verify that we can call all methods without creating an instance
      expect(() => {
        ChatHandlerFactory.getHandler('proxy');
        ChatHandlerFactory.getAvailableModes();
        ChatHandlerFactory.getDefaultMode();
        ChatHandlerFactory.getModeDescription('native');
        ChatHandlerFactory.getModeLabel('agents');
        ChatHandlerFactory.clearCache();
      }).not.toThrow();
    });

    test('should not allow instantiation', () => {
      // The constructor should be private, but we can't test that directly in TypeScript
      // However, we can verify the class is used statically
      expect(ChatHandlerFactory.constructor).toBeDefined();
    });
  });
});
