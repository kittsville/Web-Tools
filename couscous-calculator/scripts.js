const waterEl = document.getElementById('water');
const couscousEl = document.getElementById('couscous');

const ratio = 100 / 125;

waterEl.addEventListener('input', () => {
  const waterQuantity = parseInt(waterEl.value, 10);
  const lentilQuantity = waterQuantity * ratio;
  couscousEl.value = Math.round(lentilQuantity);
});

couscousEl.addEventListener('input', () => {
  const lentilQuantity = parseInt(couscousEl.value, 10);
  const waterQuantity = lentilQuantity / ratio;
  waterEl.value = Math.round(waterQuantity);
});
