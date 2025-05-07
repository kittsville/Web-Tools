const waterEl = document.getElementById('water');
const riceEl = document.getElementById('rice');

const ratio = 160 / 750;

waterEl.addEventListener('input', () => {
  const waterQuantity = parseInt(waterEl.value, 10);
  const riceQuantity = waterQuantity * ratio;
  riceEl.value = Math.round(riceQuantity);
});

riceEl.addEventListener('input', () => {
  const riceQuantity = parseInt(riceEl.value, 10);
  const waterQuantity = riceQuantity / ratio;
  waterEl.value = Math.round(waterQuantity);
});
