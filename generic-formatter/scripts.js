const textarea = document.getElementById('input-text');

const increaseIndentTriggers = new Set(['[', '{', '(', '<']);
const decreaseIndentTriggers = new Set([']', '}', ')', '>']);
const preCharacterNewlineTriggers = new Set([...decreaseIndentTriggers]);
const postCharacterNewlineTriggers = new Set([',', ...increaseIndentTriggers]);
const ignoreCharacterPostNewline = new Set([' ', '  ']);
const indent = '    ';
const arrowBars = new Set(['-', '='])

const format = (input) => {
  let output = '';
  let numOfIndents = 0;
  let directlyProceedsIndent = false;

  for (let i = 0; i < input.length; i++) {
    let character = input[i];

    const isLeftArrow = character == '<' && arrowBars.has(input[i + 1]);
    const isRightArrow = character == '>' && arrowBars.has(input[i - 1]);

    if (directlyProceedsIndent) {
      directlyProceedsIndent = false;

      if (ignoreCharacterPostNewline.has(character)) {
        continue;
      }
    }

    if (increaseIndentTriggers.has(character) && !isLeftArrow) {
      numOfIndents++;
    }

    if (decreaseIndentTriggers.has(character) && !isRightArrow) {
      numOfIndents = Math.max(numOfIndents - 1, 0);
    }

    if (preCharacterNewlineTriggers.has(character) && !isRightArrow) {
      output += '\n' + indent.repeat(numOfIndents);
    }

    output += character;

    if (postCharacterNewlineTriggers.has(character) && !isLeftArrow) {
      output += '\n' + indent.repeat(numOfIndents);
      directlyProceedsIndent = true;
    }
  }

  return output;
};

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = format(e.target.value);
});

const exampleLog = `Foo(Bar, Bux(Lor), Poi{Mux<Ran, Cor>})`

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleLog;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
