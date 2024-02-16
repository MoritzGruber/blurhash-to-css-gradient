export const decode83 = (str: String) => {
  let value = 0;
  for (let i = 0; i < str.length; i++) {
    value =
      value * 83 +
      [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '#',
        '$',
        '%',
        '*',
        '+',
        ',',
        '-',
        '.',
        ':',
        ';',
        '=',
        '?',
        '@',
        '[',
        ']',
        '^',
        '_',
        '{',
        '|',
        '}',
        '~',
      ].indexOf(str[i]);
  }
  return value;
};

export const sRGBToLinear = (value: number) => {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

export const linearTosRGB = (value: number) => {
  const v = Math.max(0, Math.min(1, value));
  const a = 1.055,
    b = 0.055,
    gamma = 1 / 2.4;
  return Math.trunc(
    (v <= 0.0031308 ? v * 12.92 : a * Math.pow(v, gamma) - b) * 255 + 0.5
  );
};

export class InvalidBlurhashError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBlurhashError';
    this.message = message;
  }
}

const validateBlurhash = (blurhash: string) => {
  if (!blurhash || blurhash.length < 6) {
    throw new InvalidBlurhashError(
      'The blurhash string must be at least 6 characters'
    );
  }

  const numY = Math.floor(decode83(blurhash[0]) / 9) + 1;
  const numX = (decode83(blurhash[0]) % 9) + 1;

  if (blurhash.length !== 4 + 2 * numX * numY) {
    throw new InvalidBlurhashError(
      `blurhash length mismatch: length is ${
        blurhash.length
      } but it should be ${4 + 2 * numX * numY}`
    );
  }
};

const decodeDC = (value: number) => {
  const intR = value >> 16;
  const intG = (value >> 8) & 255;
  const intB = value & 255;
  return [sRGBToLinear(intR), sRGBToLinear(intG), sRGBToLinear(intB)];
};

const decodeAC = (value: number, maximumValue: number) => {
  const divisor = 19 * 19;
  const quantR = Math.floor(value / divisor);
  const quantG = Math.floor(value / 19) % 19;
  const quantB = value % 19;

  // Inline and simplify the sign and power operation to avoid extra function calls.
  const adjustValue = (quant: number) => {
    const sign = quant - 9 < 0 ? -1 : 1; // Directly compute the sign.
    const normalized = (quant - 9) / 9;
    return sign * normalized * normalized * maximumValue; // Use squaring instead of Math.pow for exp=2.
  };

  const rgb = [adjustValue(quantR), adjustValue(quantG), adjustValue(quantB)];

  return rgb;
};

export const decodeBlurhash = (
  blurhash: string,
  width: number,
  height: number,
  punch: number = 1
) => {
  const sizeFlag = decode83(blurhash[0]);
  const numY = Math.floor(sizeFlag / 9) + 1;
  const numX = (sizeFlag % 9) + 1;

  const quantisedMaximumValue = decode83(blurhash[1]);
  const maximumValue = ((quantisedMaximumValue + 1) / 166) * punch;

  const colors = Array.from({ length: numX * numY }, (_, i) =>
    i === 0
      ? decodeDC(decode83(blurhash.substring(2, 6)))
      : decodeAC(
          decode83(blurhash.substring(4 + i * 2, 6 + i * 2)),
          maximumValue
        )
  );

  const bytesPerRow = width * 4;
  const pixels = new Uint8ClampedArray(bytesPerRow * height);

  const cosX = Array.from({ length: width }, (_, x) =>
    Array.from({ length: numX }, (__, i) => Math.cos((Math.PI * x * i) / width))
  );
  const cosY = Array.from({ length: height }, (_, y) =>
    Array.from({ length: numY }, (__, j) =>
      Math.cos((Math.PI * y * j) / height)
    )
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let j = 0; j < numY; j++) {
        for (let i = 0; i < numX; i++) {
          const basis = cosX[x][i] * cosY[y][j];
          const color = colors[i + j * numX];
          r += color[0] * basis;
          g += color[1] * basis;
          b += color[2] * basis;
        }
      }

      const offset = y * bytesPerRow + x * 4;
      pixels[offset] = linearTosRGB(r);
      pixels[offset + 1] = linearTosRGB(g);
      pixels[offset + 2] = linearTosRGB(b);
      pixels[offset + 3] = 255; // alpha
    }
  }
  return pixels;
};

export function pixelsToCssGradients(
  pixels: Uint8ClampedArray,
  columns: number,
  rows: number
): Array<string> {
  const stops = [];
  const maxColIndex = columns - 1;
  const maxRowIndex = rows - 1;

  for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
    const col = j % columns;
    const row = Math.floor(j / columns);

    const percentX =
      col === 0 ? 0 : Math.round((col / maxColIndex) * 100) + '%';
    const percentY =
      row === 0 ? 0 : Math.round((row / maxRowIndex) * 100) + '%';

    const r = pixels[i].toString(16).padStart(2, '0');
    const g = pixels[i + 1].toString(16).padStart(2, '0');
    const b = pixels[i + 2].toString(16).padStart(2, '0');

    const color =
      'radial-gradient(at ' +
      percentX +
      ' ' +
      percentY +
      ',#' +
      r +
      g +
      b +
      ',#00000000 50%)';
    stops.push(color);
  }

  return stops;
}

/**
 * Transforms a given blurhash into a CSS linear-gradient representation. Throws InvalidBlurhashError error if the blurhash is invalid.
 *
 * A blurhash is a compact representation of a placeholder for an image, which can be used
 * to generate a gradient resembling the image's appearance before the actual image loads.
 * This function approximates the visual effect of the blurhash as a CSS linear-gradient,
 * allowing for a lightweight and stylistic placeholder.
 *
 * The resulting CSS gradient can be directly applied as a background in web design, providing
 * a visually appealing approximation of the image content. This method can enhance user experience
 * by offering a glimpse of the image's color scheme and general composition before it fully appears.
 *
 * @param {string} blurhash - The blurhash string representing the image. It encodes the image's
 * colors and patterns in a compact form, which this function decodes into a gradient.
 * @param {number} [columns=4] - The number of horizontal gradient dots to generate. Increasing
 * this number results in a gradient that more closely approximates the blurhash, at the cost of
 * CSS string length. Default value is 4.
 * @param {number} [rows=3] - The number of vertical gradient dots to generate. Similar to the
 * 'columns' parameter, increasing this number improves the approximation fidelity but makes the
 * CSS string longer. Default value is 3.
 *
 * @returns {string} A CSS linear-gradient() string that visually represents the blurhash. This
 * string can be used in CSS stylesheets or inline styles to render a gradient approximation of
 * the original image encoded by the blurhash.
 */
export function blurhashToCssGradient(
  blurhash: string,
  columns = 4,
  rows = 3
): string {
  validateBlurhash(blurhash);
  const pixels = decodeBlurhash(blurhash, columns, rows);
  return pixelsToCssGradients(pixels, columns, rows).join(',');
}
