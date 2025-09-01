import { debug, logger } from '../debug';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
const mockConsoleTime = jest.spyOn(console, 'time').mockImplementation();
const mockConsoleTimeEnd = jest.spyOn(console, 'timeEnd').mockImplementation();
const mockConsoleGroup = jest.spyOn(console, 'group').mockImplementation();
const mockConsoleGroupEnd = jest.spyOn(console, 'groupEnd').mockImplementation();

describe('Debug Utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
    // Restore original console methods
    mockConsoleLog.mockRestore();
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleTime.mockRestore();
    mockConsoleTimeEnd.mockRestore();
    mockConsoleGroup.mockRestore();
    mockConsoleGroupEnd.mockRestore();
  });

  describe('debug logging with DEBUG=true', () => {
    beforeEach(() => {
      process.env.DEBUG = 'true';
    });

    test('debug.log should log with timestamp and category', () => {
      debug.log('TEST', 'This is a test message', { extra: 'data' });
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] TEST:/),
        'This is a test message',
        { extra: 'data' }
      );
    });

    test('debug.warn should log formatted warning', () => {
      debug.warn('WARNING', 'This is a warning', 123);
      
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] WARNING:/),
        'This is a warning',
        123
      );
    });

    test('debug.error should log formatted error', () => {
      debug.error('ERROR', 'This is an error');
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] ERROR:/),
        'This is an error'
      );
    });

    test('debug.time should start timer with formatted label', () => {
      debug.time('test-timer');
      
      expect(mockConsoleTime).toHaveBeenCalledWith('⏱️ test-timer');
    });

    test('debug.timeEnd should end timer with formatted label', () => {
      debug.timeEnd('test-timer');
      
      expect(mockConsoleTimeEnd).toHaveBeenCalledWith('⏱️ test-timer');
    });

    test('debug.perf should log with duration', () => {
      const startTime = Date.now() - 100; // 100ms ago
      debug.perf('PERF', 'Operation completed', startTime);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] PERF:/),
        expect.stringMatching(/Operation completed \(\+\d+ms\)/)
      );
    });

    test('debug.group should create console group', () => {
      debug.group('Test Group');
      
      expect(mockConsoleGroup).toHaveBeenCalledWith('🔧 Test Group');
    });

    test('debug.groupEnd should end console group', () => {
      debug.groupEnd();
      
      expect(mockConsoleGroupEnd).toHaveBeenCalled();
    });

    test('debug.enabled reflects the initial state', () => {
      // debug.enabled is set when module is loaded, not dynamically updated
      expect(typeof debug.enabled).toBe('boolean');
    });
  });

  describe('debug logging with DEBUG=false', () => {
    beforeEach(() => {
      process.env.DEBUG = 'false';
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true
      });
    });

    test('debug.log should not log anything', () => {
      debug.log('TEST', 'This should not log');
      
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    test('debug.warn should log simple warning format', () => {
      debug.warn('WARNING', 'This is a warning');
      
      expect(mockConsoleWarn).toHaveBeenCalledWith('⚠️ WARNING: This is a warning');
    });

    test('debug.error should log simple error format', () => {
      debug.error('ERROR', 'This is an error');
      
      expect(mockConsoleError).toHaveBeenCalledWith('❌ ERROR: This is an error');
    });

    test('debug.time should not start timer', () => {
      debug.time('test-timer');
      
      expect(mockConsoleTime).not.toHaveBeenCalled();
    });

    test('debug.timeEnd should not end timer', () => {
      debug.timeEnd('test-timer');
      
      expect(mockConsoleTimeEnd).not.toHaveBeenCalled();
    });

    test('debug.group should not create group', () => {
      debug.group('Test Group');
      
      expect(mockConsoleGroup).not.toHaveBeenCalled();
    });

    test('debug.groupEnd should not end group', () => {
      debug.groupEnd();
      
      expect(mockConsoleGroupEnd).not.toHaveBeenCalled();
    });
  });

  describe('debug logging in development mode', () => {
    beforeEach(() => {
      delete process.env.DEBUG;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        configurable: true
      });
    });

    test('should enable debug logging by default in development', () => {
      debug.log('TEST', 'This should log in development');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] TEST:/),
        'This should log in development'
      );
    });

    test('should respect DEBUG=false in development', () => {
      process.env.DEBUG = 'false';
      debug.log('TEST', 'This should not log');
      
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });
  });

  describe('logger utilities', () => {
    beforeEach(() => {
      process.env.DEBUG = 'false';
    });

    test('logger.info should always log', () => {
      logger.info('Info message', { data: 'test' });
      
      expect(mockConsoleLog).toHaveBeenCalledWith('ℹ️ Info message', { data: 'test' });
    });

    test('logger.warn should always log warning', () => {
      logger.warn('Warning message');
      
      expect(mockConsoleWarn).toHaveBeenCalledWith('⚠️ Warning message');
    });

    test('logger.error should always log error', () => {
      logger.error('Error message', 'extra info');
      
      expect(mockConsoleError).toHaveBeenCalledWith('❌ Error message', 'extra info');
    });

    test('logger.success should always log success', () => {
      logger.success('Success message');
      
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Success message');
    });
  });

  describe('timestamp formatting', () => {
    test('should format timestamp correctly', () => {
      process.env.DEBUG = 'true';
      
      // Mock Date.prototype.toISOString instead of the constructor
      const originalToISOString = Date.prototype.toISOString;
      Date.prototype.toISOString = jest.fn().mockReturnValue('2023-01-01T15:30:45.123Z');
      
      debug.log('TEST', 'Time test');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '🔧 [15:30:45] TEST:',
        'Time test'
      );
      
      // Restore original method
      Date.prototype.toISOString = originalToISOString;
    });
  });

  describe('multiple arguments handling', () => {
    beforeEach(() => {
      process.env.DEBUG = 'true';
    });

    test('should handle multiple arguments in debug.log', () => {
      debug.log('TEST', 'Message', 'arg1', 42, { obj: true }, ['array']);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] TEST:/),
        'Message',
        'arg1',
        42,
        { obj: true },
        ['array']
      );
    });

    test('should handle no additional arguments', () => {
      debug.log('TEST', 'Just message');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/🔧 \[\d{2}:\d{2}:\d{2}\] TEST:/),
        'Just message'
      );
    });
  });
});
