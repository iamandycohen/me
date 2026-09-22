import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResearchContactForm } from './ResearchContactForm';

jest.mock('@/components/TurnstileWidget', () => ({
  TurnstileWidget: ({
    onTokenChange,
  }: {
    onTokenChange: (token: string) => void;
  }) => (
    <button type="button" onClick={() => onTokenChange('test-token')}>
      Complete verification
    </button>
  ),
}));

const context = {
  path: '/cases/parentage/highland-creek',
  label: 'Highland Creek',
  subject: '[Where the Record Ends] Research lead — Highland Creek',
};

function mockFetch(response: { ok: boolean; status: number; body: unknown }) {
  global.fetch = jest.fn(async () =>
    Promise.resolve({
      ok: response.ok,
      status: response.status,
      json: async () => response.body,
    } as Response)
  );
}

async function fillValidForm() {
  const user = userEvent.setup();
  await act(async () => {
    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(
      screen.getByLabelText(/message/i),
      'I found a record that may help this investigation.'
    );
    await user.click(
      screen.getByRole('button', { name: /complete verification/i })
    );
  });
  return user;
}

afterEach(() => {
  jest.restoreAllMocks();
});

it('submits the trusted context and shows the exact receipt confirmation', async () => {
  mockFetch({ ok: true, status: 200, body: { ok: true } });
  render(
    <ResearchContactForm context={context} turnstileSiteKey="test-site-key" />
  );
  const user = await fillValidForm();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /send research note/i })
    );
  });

  expect(
    await screen.findByText('Thanks. Your research note has been received.')
  ).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/contact',
    expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining(
        '"referringPage":"/cases/parentage/highland-creek"'
      ),
    })
  );
});

it('renders server field errors beside the matching control', async () => {
  mockFetch({
    ok: false,
    status: 422,
    body: {
      ok: false,
      error: 'validation_error',
      fieldErrors: { email: ['Enter a valid email address.'] },
    },
  });
  render(
    <ResearchContactForm context={null} turnstileSiteKey="test-site-key" />
  );
  const user = await fillValidForm();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /send research note/i })
    );
  });

  expect(
    await screen.findByText('Enter a valid email address.')
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveAttribute(
    'aria-invalid',
    'true'
  );
});

it('provides a safe retry message when the server is unavailable', async () => {
  global.fetch = jest.fn(async () => {
    throw new Error('database detail');
  });
  render(
    <ResearchContactForm context={null} turnstileSiteKey="test-site-key" />
  );
  const user = await fillValidForm();

  await act(async () => {
    await user.click(
      screen.getByRole('button', { name: /send research note/i })
    );
  });

  expect(
    await screen.findByText(/your note could not be submitted right now/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/database detail/i)).not.toBeInTheDocument();
});
