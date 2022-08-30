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

const exampleInput = 'https://www.etsy.com/uk/listing/596519682/wicker-dog-basket-light-colour-cushion?click_key=df7b2018fd48997fa5651e7bc1ef2e1cf610dc65%3A596519682&click_sum=b9b052cf&ref=user_profile&frs=1';

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
