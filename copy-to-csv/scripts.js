const textarea = document.getElementById('input-text');

const replaceCharacter = (string, index, char) => string.substring(0, index) + char + string.substring(index + 1);

const formatSQL = (input) => {
  const singleLineSQL = input.trim().replace(/(\r\n|\n|\r)/gm, " ");
  const noSemicolon = singleLineSQL.endsWith(";") ? singleLineSQL.slice(0, -1) : singleLineSQL;

  return `\\copy (${noSemicolon}) To 'output.csv' With CSV DELIMITER ',' HEADER`;
}

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = formatSQL(e.target.value);
});

const exampleText = `select username
from customers
where name ilike '%jimmy';
`

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleText;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
