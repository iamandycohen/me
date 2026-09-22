import { resolveContactContext } from './context';

describe('resolveContactContext', () => {
  it('resolves only the exact trusted Highland Creek route', () => {
    expect(resolveContactContext('/cases/parentage/highland-creek')).toEqual({
      path: '/cases/parentage/highland-creek',
      label: 'Highland Creek',
      subject: '[Where the Record Ends] Research lead — Highland Creek',
    });
    expect(
      resolveContactContext('/cases/parentage/highland-creek/')
    ).toBeNull();
    expect(
      resolveContactContext('https://www.wheretherecordends.com')
    ).toBeNull();
    expect(resolveContactContext(undefined)).toBeNull();
  });

  it.each(['constructor', 'toString', '__proto__'])(
    'rejects inherited object property %s',
    (path) => {
      expect(resolveContactContext(path)).toBeNull();
    }
  );
});
