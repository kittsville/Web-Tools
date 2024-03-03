const startTimeEl = document.getElementById('start-time');
const endTimeEl = document.getElementById('end-time');
const runtimeEl = document.getElementById('runtime');
const deferByHoursEl = document.getElementById('defer-by-hours');

const dateToTime = (date) => date.toISOString().substring(11 , 16);
const millisToHours = (millis) => millis / (60 * 60 * 1000);

const calculateDeferment = () => {
  const [startHour, startMinutes] = startTimeEl.value.split(':');
  const [endHour, endMinutes] = endTimeEl.value.split(':');
  const startDateTime = new Date();
  startDateTime.setHours(startHour, startMinutes);
  const endDateTime = new Date();
  endDateTime.setHours(endHour, endMinutes);
  endDateTime.setDate(endDateTime.getDate() + 1);

  const laundryRuntimeMillis = runtimeEl.value * 60 * 1000;

  const laundryStartTime = (new Date(endDateTime.valueOf() - laundryRuntimeMillis));

  console.log(`Laundry should start at: ${dateToTime(laundryStartTime)}`);

  const deferByHours = Math.ceil(millisToHours(laundryStartTime - startDateTime));
  deferByHoursEl.value = deferByHours;
}

const setStartTimeToNow = () => {
  const date = new Date();

  startTimeEl.value = date.toISOString().substring(11 , 16);
}

startTimeEl.addEventListener('input', calculateDeferment);
endTimeEl.addEventListener('input', calculateDeferment);
runtimeEl.addEventListener('input', calculateDeferment);

setStartTimeToNow();
calculateDeferment();
