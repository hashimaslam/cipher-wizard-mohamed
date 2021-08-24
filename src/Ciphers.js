// You can assume all these function implementations are correct,
// i.e. no need to look deeply into them for bugs.
// It'd be good to understand how they work, though.

// Examples of how these functions are used:

// rot13({ text: "abcd" }) -> "nopq"
// rotN({ text: "abcd", shift: "1" }) -> "bcde"
// rotN({ text: "abcd", shift: "-1" }) -> "zabc"
// rotN({ text: "abcd", shift: "abcd" }) -> throws error
// base64({ text: "abcd" }) -> "YWJjZA"

function rot13(options) {
  return rotN({ text: options.text, shift: 13 });
}

function rotN(options) {
  let { text, shift } = options;
  shift = parseInt(shift);
  if (isNaN(shift)) {
    throw new Error("Shift is not a number.");
  }

  let [a, z, A, Z] = ["a", "z", "A", "Z"].map((c) => c.charCodeAt(0));
  const numLetters = z - a + 1;

  function mod(n) {
    let result = n % numLetters;
    return result >= 0 ? result : result + numLetters;
  }

  return [...text]
    .map((c) => {
      let code = c.charCodeAt(0);
      if (code >= a && code <= z)
        return String.fromCharCode(a + mod(code - a + shift));
      if (code >= A && code <= Z)
        return String.fromCharCode(A + mod(code - A + shift));
      return c;
    })
    .join("");
}

function base64(options) {
  let { text } = options;

  const base = 2,
    seg = 6,
    byte = 8,
    lcm = 12;

  let [a, z, A, Z, zero, nine] = ["a", "z", "A", "Z", "0", "9"].map((c) =>
    c.charCodeAt(0)
  );
  let lookup = "";
  for (let i = A; i <= Z; i++) lookup += String.fromCharCode(i);
  for (let i = a; i <= z; i++) lookup += String.fromCharCode(i);
  for (let i = zero; i <= nine; i++) lookup += String.fromCharCode(i);
  lookup += "+/";

  const padding = "=";

  let bits = [...text]
    .map((c) => {
      let binary = c.charCodeAt(0).toString(base);
      return "0".repeat(byte - binary.length) + binary;
    })
    .join("");

  let encoded = "";
  while (bits.length % seg) bits += "0";
  for (let i = 0; i < bits.length; i += seg) {
    encoded += lookup[parseInt(bits.substring(i, i + seg), base)];
  }

  while (bits.length % lcm) {
    encoded += padding;
    bits += padding.repeat(seg);
  }

  return encoded;
}

// function memo(func) {
//   const result = {};

//   return (...args) => {
//     const argsKey = JSON.stringify(args);
//     if (!result[argsKey]) {
//       result[argsKey] = func(...args);
//     }
//     return result[argsKey];
//   };
// }

export { rot13, rotN, base64 };
