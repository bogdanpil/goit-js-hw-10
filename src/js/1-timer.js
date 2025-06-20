import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const dateInput = document.querySelector("#datetime-picker");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;
startBtn.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
const selected = selectedDates[0];
if (selected <= new Date()) {
    iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight"
    });
    startBtn.disabled = true;
} else {
    userSelectedDate = selected;
    startBtn.disabled = false;
};
      console.log(selectedDates[0]);
    },
};
  
flatpickr("#datetime-picker", options);
  
startBtn.addEventListener("click", (event) => {
    startBtn.disabled = true;
    dateInput.disabled = true;
    timerId = setInterval(() => {
        const delta = userSelectedDate - new Date();
        if (delta < 0) {
            clearInterval(timerId);
            updateTimer(0);
            dateInput.disabled = false;
            return;
        }
            updateTimer(delta);
    }, 1000);
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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  

function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}