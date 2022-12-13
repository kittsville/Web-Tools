const waterEl = document.getElementById('water');
const lentilsEl = document.getElementById('lentils');

const ratio = 350 / 800;

waterEl.addEventListener('input', () => {
  const waterQuantity = parseInt(waterEl.value, 10);
  const lentilQuantity = waterQuantity * ratio;
  lentilsEl.value = Math.round(lentilQuantity);
});

lentilsEl.addEventListener('input', () => {
  const lentilQuantity = parseInt(lentilsEl.value, 10);
  const waterQuantity = lentilQuantity / ratio;
  waterEl.value = Math.round(waterQuantity);
});
