const textarea = document.getElementById("input-text");

const mapping = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ᶦ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "ᵠ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

const exampleInput = "nyaa";

const smolText = (input) => {
  try {
    return input
      .split("")
      .map((c) => mapping[c] || c)
      .join("");
  } catch (e) {
    return e;
  }
};

textarea.addEventListener("input", (e) => {
  document.getElementById("output-text").textContent = smolText(e.target.value);
});

document.getElementById("see-example").addEventListener("click", () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(
    new Event("input", {
      bubbles: true,
      cancelable: true,
    })
  );
});
