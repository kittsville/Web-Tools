const textarea = document.getElementById('input-text');

const wrap = (input) => {
  if (!input) return '';

  return `---
<details>

<summary>Original AI comment (click to expand)</summary>

${input}

</details>`;
};

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = wrap(e.target.value);
});
