# blurhash-to-css-gradient

A zero-dependency function that converts a Blurhash value to a CSS gradient string, which can be used as an image placeholder background. 
While other blurhash libraries are available, this one is designed only for the decoding part. If you are building frontend applications, this library is for you.

## Usage

```javascript

import { blurhashToCssGradient } from 'blurhash-to-css-gradient';

const blurhash = 'UCHeUgK5ox~q~qX70Kod4=jFRPMx9bxuaLIU'; // this might be generated from your CMS like caisy.io
const backgroundColor = blurhashToCssGradient(blurhash);
console.log(backgroundColor);
```
↓output↓
```css
radial-gradient(at 0 0,#84898c,#00000000 50%),radial-gradient(at 33% 0,#888d91,#00000000 50%),radial-gradient(at 67% 0,#a3a0a4,#00000000 50%),radial-gradient(at 100% 0,#9a9194,#00000000 50%),radial-gradient(at 0 50%,#b7b8a9,#00000000 50%),radial-gradient(at 33% 50%,#9a9281,#00000000 50%),radial-gradient(at 67% 50%,#b5a69a,#00000000 50%),radial-gradient(at 100% 50%,#c2b5a7,#00000000 50%),radial-gradient(at 0 100%,#a1a09a,#00000000 50%),radial-gradient(at 33% 100%,#7f7b71,#00000000 50%),radial-gradient(at 67% 100%,#7f796f,#00000000 50%),radial-gradient(at 100% 100%,#968c82,#00000000 50%)
```

## Credits
The library is a reassibling of only the important parts form [blurhash](https://github.com/woltapp/blurhash) and [unpic-placeholder](https://github.com/ascorbic/unpic-placeholder) in one single file that are needed for decoding a blurhash value to a CSS gradient string.