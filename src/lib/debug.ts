/**
 * Debug utility for conditional logging
 * 
 * Usage:
 * - Set DEBUG=true in environment variables to enable debug logging
 * - Use debug.log(), debug.warn(), debug.error() instead of console.*
 * - Use debug.time() and debug.timeEnd() for performance timing
 */

const isDebugEnabled = () => {
  return process.env.DEBUG === 'true' ||
    process.env.NODE_ENV === 'development' && process.env.DEBUG !== 'false';
};

const formatMessage = (category: string, message: string, ...args: unknown[]) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  return [`🔧 [${timestamp}] ${category}:`, message, ...args];
};

export const debug = {
  /**
   * Log debug messages (only in debug mode)
   */
  log: (category: string, message: string, ...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.log(...formatMessage(category, message, ...args));
    }
  },

  /**
   * Log warnings (always shown, but formatted in debug mode)
   */
  warn: (category: string, message: string, ...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.warn(...formatMessage(category, message, ...args));
    } else {
      console.warn(`⚠️ ${category}: ${message}`, ...args);
    }
  },

  /**
   * Log errors (always shown, but formatted in debug mode)
   */
  error: (category: string, message: string, ...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.error(...formatMessage(category, message, ...args));
    } else {
      console.error(`❌ ${category}: ${message}`, ...args);
    }
  },

  /**
   * Performance timing utilities
   */
  time: (label: string) => {
    if (isDebugEnabled()) {
      console.time(`⏱️ ${label}`);
    }
  },

  timeEnd: (label: string) => {
    if (isDebugEnabled()) {
      console.timeEnd(`⏱️ ${label}`);
    }
  },

  /**
   * Log with custom timestamp and performance info
   */
  perf: (category: string, message: string, startTime: number, ...args: unknown[]) => {
    if (isDebugEnabled()) {
      const duration = Date.now() - startTime;
      console.log(...formatMessage(category, `${message} (+${duration}ms)`, ...args));
    }
  },

  /**
   * Check if debug mode is enabled
   */
  enabled: isDebugEnabled(),

  /**
   * Group related debug messages
   */
  group: (label: string) => {
    if (isDebugEnabled()) {
      console.group(`🔧 ${label}`);
    }
  },

  groupEnd: () => {
    if (isDebugEnabled()) {
      console.groupEnd();
    }
  }
};

/**
 * Production-safe logging that always shows important messages
 */
export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`ℹ️ ${message}`, ...args);
  },

  warn: (message: string, ...args: unknown[]) => {
    console.warn(`⚠️ ${message}`, ...args);
  },

  error: (message: string, ...args: unknown[]) => {
    console.error(`❌ ${message}`, ...args);
  },

  success: (message: string, ...args: unknown[]) => {
    console.log(`✅ ${message}`, ...args);
  }
};
