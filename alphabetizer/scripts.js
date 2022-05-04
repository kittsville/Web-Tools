const textarea = document.getElementById('input-text');

const matchBlocks = /([A-Z][a-z]+)/g

const trim = (input) => input.split('\n').sort().join('\n');

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = trim(e.target.value);
});

const exampleInput = `Bacon
Apples
Cheese`;

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
