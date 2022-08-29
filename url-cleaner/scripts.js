const textarea = document.getElementById('input-text');

const cleanUrl = (input) => {
  try {
    const url = new URL(input);

    return `${url.origin}${url.pathname}`;
  } catch (e) {
    return e;
  }
}

textarea.addEventListener('input', e => {
  document.getElementById('output-text').textContent = cleanUrl(e.target.value);
});

const exampleInput = 'https://www.amazon.co.uk/gp/product/B01MR2WKY6/ref=ppx_yo_dt_b_asin_title_o04_s00?ie=UTF8&psc=1';

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
