// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
const myInput = document.querySelector('#datetime-picker')
const btn = document.querySelector("[data-start]")
btn.setAttribute("disabled", "disabled")
let timerId = 0
let time = 0
const refs = {
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
function pad(value) {
  return String(value).padStart(2, '0');
}
const fp = flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert("Please choose a date in the future")
      return btn.setAttribute("disabled", "disabled")
    }
    if (timerId) {
        clearInterval(timerId)
    }
    btn.removeAttribute("disabled")
  },
});
btn.addEventListener('click', () => {
      timerId = setInterval(fn,1000)
    function fn() {
      time = new Date(myInput.value) - Date.now();
      const { days, hours, minutes, seconds } = convertMs(time);
      refs.day.textContent = pad(days);
      refs.hours.textContent = pad(hours);
      refs.minutes.textContent = pad(minutes);
      refs.seconds.textContent = pad(seconds);
      btn.setAttribute("disabled", "disabled")
      console.log(time)
      }
    })
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
