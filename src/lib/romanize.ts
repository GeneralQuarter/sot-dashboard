const romanLookup = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

export default function romanize(number: number): string {
  let str = '';
  let num = number;

  for (const [letter, letterNumber] of Object.entries(romanLookup)) {
    const q = Math.floor(num / letterNumber);
    num -= q * letterNumber;
    str += letter.repeat(q);
  }

  return str;
}
