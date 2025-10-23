import { NextRequest } from 'next/server';
import {
  validateChatRequest,
  validateRequestSize,
} from '@/lib/input-validation';
import {
  createSecureError,
  handleOpenAIError,
  createStreamError,
  ErrorType,
} from '@/lib/error-handler';
import { debug, logger } from '@/lib/debug';
import { getDisplayName, getFirstName } from '@/lib/data-helpers';
import data from '@/lib/data';
import { ChatHandlerFactory, type ChatMode } from '@/lib/chat-handlers';

// Constants for reuse throughout the route
const displayName = getDisplayName(data.contact);
const firstName = getFirstName(data.contact);

// Enhanced request interface to include chat mode
interface ChatRequestBody {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  mode?: ChatMode;
}

// System message for all chat modes
const SYSTEM_MESSAGE = `You are an AI assistant on ${displayName}'s personal website. You have access to comprehensive information about ${displayName}, a software engineering leader and Sitecore XM Cloud architect.

When users ask about ${firstName} or request information about his background, experience, projects, or achievements, use the available MCP tools to fetch accurate, current information. The MCP server provides access to:
- Contact information and professional details
- Biography (short and full versions)
- Work experience and career history
- Creative engineering projects
- Community contributions and thought leadership

**Important**: When analyzing work experience from the resume data:
- Check the "period" field of each role
- If a period contains "Present" (case-insensitive), that role is CURRENT and ongoing
- If a period does NOT contain "Present", that role has ENDED, even if the end date is recent or in the future
- When asked about current employment, only report roles with "Present" in the period
- If no roles contain "Present", ${firstName} is currently between jobs and open to new opportunities

Always use the MCP tools to provide accurate, up-to-date information rather than making assumptions.`;

// Configuration constants
const MAX_TOOL_LOOPS = parseInt(process.env.LLM_MAX_TOOL_LOOPS || '6', 10);
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE || '0.2');
const MODEL = process.env.LLM_MODEL || 'gpt-4o-mini';

// Log configuration in debug mode
debug.log(
  'CHAT-CONFIG',
  `Model: ${MODEL}, Temperature: ${TEMPERATURE}, Max Loops: ${MAX_TOOL_LOOPS}`
);

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  debug.log('CHAT-API', 'Request started');

  try {
    // Environment validation
    if (!process.env.OPENAI_API_KEY) {
      logger.error('OpenAI API key not configured');
      return createSecureError(
        ErrorType.INTERNAL,
        undefined,
        'Service configuration error'
      );
    }

    // Validate request size before parsing
    const sizeValidation = validateRequestSize(request);
    if (!sizeValidation.success) {
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        sizeValidation.error
      );
    }

    // Parse and validate request
    const body: ChatRequestBody = await request.json();
    const validation = validateChatRequest(body);
    if (!validation.success || !validation.data) {
      debug.warn('CHAT-API', 'Validation failed', validation.error);
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        validation.error
      );
    }

    // Extract chat mode (default to proxy)
    const mode: ChatMode = body.mode || ChatHandlerFactory.getDefaultMode();
    const messages = validation.data.messages;

    debug.log('CHAT-API', `Using chat mode: ${mode}`);
    logger.info(
      `Chat request using ${ChatHandlerFactory.getModeLabel(mode)} - ${ChatHandlerFactory.getModeDescription(mode)}`
    );

    // Create handler configuration
    const config = {
      model: MODEL,
      temperature: TEMPERATURE,
      maxToolLoops: MAX_TOOL_LOOPS,
      systemMessage: SYSTEM_MESSAGE,
    };

    // Create chat request
    const chatRequest = {
      messages,
      mode,
    };

    // Stream response using the appropriate handler
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const handler = ChatHandlerFactory.getHandler(mode);
          await handler.handleChat(chatRequest, config, controller);
        } catch (error) {
          logger.error(`Error in ${mode} chat handler:`, error);
          // Use secure error handling for streaming responses
          const secureErrorData = createStreamError(ErrorType.INTERNAL, error);
          controller.enqueue(new TextEncoder().encode(secureErrorData));
          controller.close();
        }
      },
    });

    debug.perf('CHAT-API', 'Request completed successfully', startTime);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    logger.error('Error in chat route:', error);

    // Handle different types of errors securely
    if (error && typeof error === 'object' && 'status' in error) {
      return handleOpenAIError(error);
    }

    return createSecureError(ErrorType.INTERNAL, error);
  }
}
