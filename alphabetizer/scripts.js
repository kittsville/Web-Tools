const textarea = document.getElementById('input-text');

const matchBlocks = /([A-Z][a-z]+)/g

const sort = (input) => input.split('\n').sort().join('\n');
const revSort = (input) => input.split('\n').sort((a, b) => a < b).join('\n');

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = sort(e.target.value);
  document.getElementById('output-text-2').textContent = revSort(e.target.value);
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
