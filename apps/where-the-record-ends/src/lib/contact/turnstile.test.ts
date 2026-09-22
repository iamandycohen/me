import { createTurnstileVerifier } from './turnstile';

describe('createTurnstileVerifier', () => {
  it('fails closed without sending a request when the secret is unavailable', async () => {
    const fetchImpl = jest.fn();
    const verifier = createTurnstileVerifier({
      fetchImpl,
      getSecret: () => undefined,
    });

    await expect(verifier.verify('token')).resolves.toEqual({
      status: 'unavailable',
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('verifies the token with Cloudflare using form-encoded server credentials', async () => {
    const fetchImpl = jest.fn<Promise<Response>, Parameters<typeof fetch>>(
      async () =>
        ({
          ok: true,
          json: async () => ({ success: true }),
        }) as Response
    );
    const verifier = createTurnstileVerifier({
      fetchImpl,
      getSecret: () => 'server-secret',
    });

    await expect(verifier.verify('visitor-token')).resolves.toEqual({
      status: 'verified',
    });
    const [, request] = fetchImpl.mock.calls[0];
    expect(request).toMatchObject({ method: 'POST' });
    expect((request?.body as URLSearchParams).get('secret')).toBe(
      'server-secret'
    );
    expect((request?.body as URLSearchParams).get('response')).toBe(
      'visitor-token'
    );
  });

  it('fails closed on a provider rejection or provider error', async () => {
    const rejected = createTurnstileVerifier({
      fetchImpl: async () =>
        ({
          ok: true,
          json: async () => ({ success: false }),
        }) as Response,
      getSecret: () => 'secret',
    });
    const unavailable = createTurnstileVerifier({
      fetchImpl: async () => {
        throw new Error('private provider detail');
      },
      getSecret: () => 'secret',
    });

    await expect(rejected.verify('token')).resolves.toEqual({
      status: 'rejected',
    });
    await expect(unavailable.verify('token')).resolves.toEqual({
      status: 'unavailable',
    });
  });
});
