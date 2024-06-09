import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let userSelectedDate;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.inputEl.disabled = true;

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const ms = userSelectedDate - currentTime;
    const timeObj = convertMs(ms);
    addLeadingZero(timeObj);
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    refs.startBtn.disabled = false;
    refs.inputEl.disabled = false;
  }, userSelectedDate - Date.now());
});

const fp = flatpickr(refs.inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date(selectedDates[0]);
    if (date.getTime() < Date.now()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: 16,
        titleLineHeight: 1.5,
        message: 'Please choose a date in the future',
        messageSize: 16,
        messageLineHeight: 1.5,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 5000,
        color: '#fff',
        theme: 'dark',
      });
    } else {
      refs.startBtn.disabled = false;
      userSelectedDate = date.getTime();
    }
    console.log(selectedDates[0]);
  },
});

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  if (days > 99) {
    refs.daysEl.textContent = days.toString().padStart(3, '0');
  }
  refs.daysEl.textContent = days.toString().padStart(2, '0');
  refs.hoursEl.textContent = hours.toString().padStart(2, '0');
  refs.minutesEl.textContent = minutes.toString().padStart(2, '0');
  refs.secondsEl.textContent = seconds.toString().padStart(2, '0');
}
