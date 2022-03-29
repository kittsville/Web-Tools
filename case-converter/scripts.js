const textarea = document.getElementById('input-text');

const matchBlocks = /([A-Z][a-z]+)/g

const snakeCaseText = (input) => {
  const matches = input.match(matchBlocks);

  if (matches) {
    return matches.map(part => part.toLowerCase()).join('_');
  } else {
    return 'Failed to parse';
  }
};

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = snakeCaseText(e.target.value);
});

const exampleLog = `FooBarBux`

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleLog;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
