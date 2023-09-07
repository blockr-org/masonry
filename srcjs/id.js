const char = (a) => String.fromCharCode(a);

const irand = (x) => Math.floor(Math.random() * x);

const sample = (xs) => xs.at(irand(xs.length));

const range = (x) => (y) => x > y ? [] : [x, ...range(x + 1)(y)];

const srand = (rs) => (n) => n <= 0 ? "" : char(sample(rs)) + srand(rs)(n - 1);

export const identifier = srand([
  ...range(48)(57), // include 0-9
  ...range(65)(90), // include A-Z
  ...range(97)(122), // include a-z
]);
