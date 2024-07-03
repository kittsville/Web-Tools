const waterEl = document.getElementById('water');
const couscousEl = document.getElementById('couscous');

const ratio = 100 / 125;

waterEl.addEventListener('input', () => {
  const waterQuantity = parseInt(waterEl.value, 10);
  const couscousQuantity = waterQuantity * ratio;
  couscousEl.value = Math.round(couscousQuantity);
});

couscousEl.addEventListener('input', () => {
  const couscousQuantity = parseInt(couscousEl.value, 10);
  const waterQuantity = couscousQuantity / ratio;
  waterEl.value = Math.round(waterQuantity);
});
