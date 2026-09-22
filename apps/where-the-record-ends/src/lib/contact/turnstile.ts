const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_TIMEOUT_MS = 5_000;

type TurnstileResponse = {
  success?: unknown;
};

export type TurnstileVerification =
  | { status: 'verified' }
  | { status: 'rejected' }
  | { status: 'unavailable' };

export type TurnstileVerifier = {
  verify(token: string): Promise<TurnstileVerification>;
};

export function createTurnstileVerifier({
  fetchImpl = fetch,
  getSecret = () => process.env.TURNSTILE_SECRET_KEY,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: {
  fetchImpl?: typeof fetch;
  getSecret?: () => string | undefined;
  timeoutMs?: number;
} = {}): TurnstileVerifier {
  return {
    async verify(token) {
      const secret = getSecret()?.trim();
      if (!secret) {
        return { status: 'unavailable' };
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetchImpl(TURNSTILE_VERIFY_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ secret, response: token }),
          signal: controller.signal,
        });

        if (!response.ok) {
          return { status: 'unavailable' };
        }

        const result = (await response.json()) as TurnstileResponse;
        return result.success === true
          ? { status: 'verified' }
          : { status: 'rejected' };
      } catch {
        return { status: 'unavailable' };
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}
