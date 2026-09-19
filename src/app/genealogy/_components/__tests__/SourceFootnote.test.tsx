import { render, screen } from '@testing-library/react';

import SourceFootnote from '../SourceFootnote';

describe('SourceFootnote', () => {
  it('links to references on the current genealogy page by default', () => {
    render(<SourceFootnote referenceIds={[65, 65, 67]} />);

    expect(
      screen.getByRole('doc-noteref', { name: 'Go to reference 65' })
    ).toHaveAttribute('href', '#reference-65');
    expect(screen.getAllByRole('doc-noteref')).toHaveLength(2);
  });

  it('can link back to the genealogy reference ledger from another route', () => {
    render(<SourceFootnote referenceIds={68} referencesPath="/genealogy" />);

    expect(
      screen.getByRole('doc-noteref', { name: 'Go to reference 68' })
    ).toHaveAttribute('href', '/genealogy#reference-68');
  });
});
