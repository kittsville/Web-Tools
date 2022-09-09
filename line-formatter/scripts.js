const textarea = document.getElementById('input-text');

const cleanUrl = (input, prefix, suffix, joiner) =>
  input
    .split('\n')
    .map(row => `${prefix}${row}${suffix}`)
    .join(joiner)

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = cleanUrl(e.target.value, '"', '"', ',\n');
});

const exampleInput = `Foo
Bar
Bux
Poi`;

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
