const textarea = document.getElementById('input-text');

const replaceCharacter = (string, index, char) => string.substring(0, index) + char + string.substring(index + 1);

const trainCaseText = (input) => {
  let uppercaseNextChar = false;

  for (let index = 0; index < input.length; index++) {
    const currentChar = input[index];

    if (uppercaseNextChar) {
      input = replaceCharacter(input, index, currentChar.toUpperCase());
    }

    if (currentChar === "_") {
      input = replaceCharacter(input, index, "-");
    }

    uppercaseNextChar = currentChar === "_" || currentChar === " " || currentChar === "\n";
  }

  return input;
};

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = trainCaseText(e.target.value);
});

const exampleText = `Foo_bar_bux`

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleText;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
