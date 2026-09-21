import { getLegacyReferenceUrl } from '../LegacyGenealogyHashRedirect';

describe('getLegacyReferenceUrl', () => {
  it('maps an old citation anchor to the standalone source catalog', () => {
    expect(getLegacyReferenceUrl('#reference-68')).toBe(
      'https://www.wheretherecordends.com/sources#reference-68'
    );
  });

  it.each(['', '#references', '#reference-x', '#investigation'])(
    'ignores non-citation hash %s',
    (hash) => {
      expect(getLegacyReferenceUrl(hash)).toBeNull();
    }
  );
});
