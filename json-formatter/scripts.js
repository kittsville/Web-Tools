const textarea = document.getElementById('input-text');

const matchBlocks = /([A-Z][a-z]+)/g

const formatJson = (input, spacing) => {
  try {
    const json = JSON.parse(input);
    return JSON.stringify(json, null, spacing);
  } catch (e) {
    return `Failed to parse JSON: ${e}`;
  }
}

const prettyJson = (input) => formatJson(input, 2);
const compactJson = (input) => formatJson(input, 0);

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = prettyJson(e.target.value);
  document.getElementById('output-text-2').textContent = compactJson(e.target.value);
});

const exampleInput = `{
  "foo": ["bar", "bux", "poi"]
}`;

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
