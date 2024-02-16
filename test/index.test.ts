import { blurhashToGradient } from '../src';

const exampleCases = [
  [
    'UCHeUgK5ox~q~qX70Kod4=jFRPMx9bxuaLIU',
    'radial-gradient(at 0 0,#84898c,#00000000 50%),radial-gradient(at 33% 0,#888d91,#00000000 50%),radial-gradient(at 67% 0,#a3a0a4,#00000000 50%),radial-gradient(at 100% 0,#9a9194,#00000000 50%),radial-gradient(at 0 50%,#b7b8a9,#00000000 50%),radial-gradient(at 33% 50%,#9a9281,#00000000 50%),radial-gradient(at 67% 50%,#b5a69a,#00000000 50%),radial-gradient(at 100% 50%,#c2b5a7,#00000000 50%),radial-gradient(at 0 100%,#a1a09a,#00000000 50%),radial-gradient(at 33% 100%,#7f7b71,#00000000 50%),radial-gradient(at 67% 100%,#7f796f,#00000000 50%),radial-gradient(at 100% 100%,#968c82,#00000000 50%)',
    4,
    3,
  ],
  [
    'UTG9ET%M-;4U%2tP-;ad~q%NxZIUkDs:s;WC',
    'radial-gradient(at 0 0,#d4cacc,#00000000 50%),radial-gradient(at 33% 0,#e1e6e0,#00000000 50%),radial-gradient(at 67% 0,#919793,#00000000 50%),radial-gradient(at 100% 0,#887e80,#00000000 50%),radial-gradient(at 0 50%,#797768,#00000000 50%),radial-gradient(at 33% 50%,#929a89,#00000000 50%),radial-gradient(at 67% 50%,#5f5544,#00000000 50%),radial-gradient(at 100% 50%,#5d4745,#00000000 50%),radial-gradient(at 0 100%,#5b4e64,#00000000 50%),radial-gradient(at 33% 100%,#8b9588,#00000000 50%),radial-gradient(at 67% 100%,#5b675a,#00000000 50%),radial-gradient(at 100% 100%,#33404a,#00000000 50%)',
    4,
    3,
  ],
  [
    'U104~]dCdCeTdCg$g$hKdCg3g$e9dCeTg$eT',
    'radial-gradient(at 0 0,#007b7b,#00000000 50%),radial-gradient(at 33% 0,#007a7a,#00000000 50%),radial-gradient(at 67% 0,#007b7b,#00000000 50%),radial-gradient(at 100% 0,#007e7e,#00000000 50%),radial-gradient(at 0 50%,#008484,#00000000 50%),radial-gradient(at 33% 50%,#008787,#00000000 50%),radial-gradient(at 67% 50%,#008d8d,#00000000 50%),radial-gradient(at 100% 50%,#008c8c,#00000000 50%),radial-gradient(at 0 100%,#007c7c,#00000000 50%),radial-gradient(at 33% 100%,#008484,#00000000 50%),radial-gradient(at 67% 100%,#008989,#00000000 50%),radial-gradient(at 100% 100%,#008888,#00000000 50%)',
    4,
    3,
  ],
  [
    'UXFr;aRiD%M_~qt7ofj[xv%MayWB%Noft7Rj',
    'radial-gradient(at 0 0,#bbbbbf,#00000000 50%),radial-gradient(at 33% 0,#d4d4dd,#00000000 50%),radial-gradient(at 67% 0,#ceced7,#00000000 50%),radial-gradient(at 100% 0,#b3b3bd,#00000000 50%),radial-gradient(at 0 50%,#56562c,#00000000 50%),radial-gradient(at 33% 50%,#85857f,#00000000 50%),radial-gradient(at 67% 50%,#a4a49f,#00000000 50%),radial-gradient(at 100% 50%,#94948c,#00000000 50%),radial-gradient(at 0 100%,#000000,#00000000 50%),radial-gradient(at 33% 100%,#787882,#00000000 50%),radial-gradient(at 67% 100%,#8b8b92,#00000000 50%),radial-gradient(at 100% 100%,#77777e,#00000000 50%)',
    4,
    3,
  ],
  [
    'UXFr;aRiD%M_~qt7ofj[xv%MayWB%Noft7Rj',
    'radial-gradient(at 0 0,#bbbbbf,#00000000 50%),radial-gradient(at 25% 0,#ceced6,#00000000 50%),radial-gradient(at 50% 0,#d8d8e2,#00000000 50%),radial-gradient(at 75% 0,#bfbfc7,#00000000 50%),radial-gradient(at 100% 0,#b4b4c0,#00000000 50%),radial-gradient(at 0 20%,#9f9f9b,#00000000 50%),radial-gradient(at 25% 20%,#b4b4b6,#00000000 50%),radial-gradient(at 50% 20%,#c5c5ca,#00000000 50%),radial-gradient(at 75% 20%,#b6b6b8,#00000000 50%),radial-gradient(at 100% 20%,#a6a6ac,#00000000 50%),radial-gradient(at 0 40%,#56562c,#00000000 50%),radial-gradient(at 25% 40%,#79796f,#00000000 50%),radial-gradient(at 50% 40%,#9f9f9c,#00000000 50%),radial-gradient(at 75% 40%,#a2a299,#00000000 50%),radial-gradient(at 100% 40%,#8e8e89,#00000000 50%),radial-gradient(at 0 60%,#030300,#00000000 50%),radial-gradient(at 25% 60%,#606059,#00000000 50%),radial-gradient(at 50% 60%,#8f8f90,#00000000 50%),radial-gradient(at 75% 60%,#90908a,#00000000 50%),radial-gradient(at 100% 60%,#868685,#00000000 50%),radial-gradient(at 0 80%,#000000,#00000000 50%),radial-gradient(at 25% 80%,#68686f,#00000000 50%),radial-gradient(at 50% 80%,#8f8f99,#00000000 50%),radial-gradient(at 75% 80%,#808084,#00000000 50%),radial-gradient(at 100% 80%,#797983,#00000000 50%),radial-gradient(at 0 100%,#000000,#00000000 50%),radial-gradient(at 25% 100%,#474750,#00000000 50%),radial-gradient(at 50% 100%,#7d7d87,#00000000 50%),radial-gradient(at 75% 100%,#67676b,#00000000 50%),radial-gradient(at 100% 100%,#404051,#00000000 50%)',
    5,
    6,
  ],
  [
    'U9C$=r?vayn%0hI=s:ae00?FWBNa~S9E9Gxu',
    'radial-gradient(at 0 0,#525549,#00000000 50%),radial-gradient(at 25% 0,#5a5b4e,#00000000 50%),radial-gradient(at 50% 0,#656459,#00000000 50%),radial-gradient(at 75% 0,#62605a,#00000000 50%),radial-gradient(at 100% 0,#4d4447,#00000000 50%),radial-gradient(at 0 20%,#5f656b,#00000000 50%),radial-gradient(at 25% 20%,#5d6369,#00000000 50%),radial-gradient(at 50% 20%,#545960,#00000000 50%),radial-gradient(at 75% 20%,#45444f,#00000000 50%),radial-gradient(at 100% 20%,#3c3342,#00000000 50%),radial-gradient(at 0 40%,#767b8a,#00000000 50%),radial-gradient(at 25% 40%,#6c7485,#00000000 50%),radial-gradient(at 50% 40%,#515b71,#00000000 50%),radial-gradient(at 75% 40%,#3f3b54,#00000000 50%),radial-gradient(at 100% 40%,#4d4552,#00000000 50%),radial-gradient(at 0 60%,#858386,#00000000 50%),radial-gradient(at 25% 60%,#808183,#00000000 50%),radial-gradient(at 50% 60%,#7d7d7d,#00000000 50%),radial-gradient(at 75% 60%,#847a78,#00000000 50%),radial-gradient(at 100% 60%,#827773,#00000000 50%),radial-gradient(at 0 80%,#8a8072,#00000000 50%),radial-gradient(at 25% 80%,#8a8272,#00000000 50%),radial-gradient(at 50% 80%,#938b7a,#00000000 50%),radial-gradient(at 75% 80%,#9c9082,#00000000 50%),radial-gradient(at 100% 80%,#918478,#00000000 50%),radial-gradient(at 0 100%,#877d72,#00000000 50%),radial-gradient(at 25% 100%,#867a70,#00000000 50%),radial-gradient(at 50% 100%,#7f7268,#00000000 50%),radial-gradient(at 75% 100%,#71645c,#00000000 50%),radial-gradient(at 100% 100%,#61534d,#00000000 50%)',
    5,
    6,
  ],
];

describe('blurhashToGradient', () => {
  it('returns a valid CSS gradient for a given blurhash', () => {
    // Example blurhash
    const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
    const columns = 4;
    const rows = 3;

    const result = blurhashToGradient(blurhash, columns, rows);

    // Basic checks to ensure the output is in the expected format
    expect(result).toContain('radial-gradient');
    expect(result).toContain('#');
    expect(result.split(',').length).toBeGreaterThan(1); // Should contain multiple gradients
  });

  for (const [blurhash, expected, columns, rows] of exampleCases) {
    it(`returns the expected CSS gradient for blurhash "${blurhash}" [${columns}, ${rows}]`, () => {
      const result = blurhashToGradient(
        `${blurhash}`,
        columns as number,
        rows as number
      );
      expect(result).toEqual(expected);
    });
  }

  it('returns different gradients for different column and row values', () => {
    const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
    const result1 = blurhashToGradient(blurhash, 4, 3);
    const result2 = blurhashToGradient(blurhash, 5, 4);

    expect(result1).not.toEqual(result2);
  });

  it('handles edge cases gracefully', () => {
    // Edge case: very low column/row values
    const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
    expect(() => blurhashToGradient(blurhash, 1, 1)).not.toThrow();

    // Edge case: invalid blurhash
    const invalidBlurhash = 'invalid';
    expect(() => blurhashToGradient(invalidBlurhash, 4, 3)).toThrow();
  });
});
