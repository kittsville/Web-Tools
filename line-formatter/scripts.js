const textarea = document.getElementById('input-text');
const separatorEl = document.getElementById('input-separator');
const joinerEl = document.getElementById('input-joiner');
const prefixEl = document.getElementById('input-prefix');
const suffixEl = document.getElementById('input-suffix');

const eventHandler = () => {
  const input     = textarea.value;
  const separator = separatorEl.value;
  const joiner    = joinerEl.value;
  const prefix    = prefixEl.value;
  const suffix    = suffixEl.value;

  document.getElementById('output-text').textContent = input
    .split(separator)
    .map(row => `${prefix}${row.trim()}${suffix}`)
    .join(joiner);
};

textarea.addEventListener('input', eventHandler);
separatorEl.addEventListener('input', eventHandler);
joinerEl.addEventListener('input', eventHandler);
prefixEl.addEventListener('input', eventHandler);
suffixEl.addEventListener('input', eventHandler);

const exampleInput = `Foo
Bar
Bux
Poi`;
const exampleSeparator = '\n';
const exampleJoiner = ',\n';
const examplePrefix = '"';
const exampleSuffix = '"';

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  separatorEl.value = exampleSeparator;
  joinerEl.value = exampleJoiner;
  prefixEl.value = examplePrefix;
  suffixEl.value = exampleSuffix;

  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
