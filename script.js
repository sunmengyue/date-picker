import { v4 } from 'uuid';
import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

const datePickerButton = document.querySelector('.date-picker-button');
const datePicker = document.querySelector('.date-picker');
const datePickerHeaderText = document.querySelector('.current-month');
const dateGrid = document.querySelector('.date-picker-grid-dates');
const prevMonthButton = document.querySelector('.prev-month-button');
const nextMonthButton = document.querySelector('.next-month-button');
let currentDate = new Date();

datePickerButton.addEventListener('click', (e) => {
  datePicker.classList.toggle('show');
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = selectedDate;
  setupDatePicker(selectedDate);
});

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, 'MMMM - yyyy');
  setupDates(selectedDate);
}

function setupDates(currentDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));

  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  dateGrid.innerHTML = '';

  dates.forEach((date) => {
    const dateElement = document.createElement('button');
    dateElement.classList.add('date');
    dateGrid.appendChild(dateElement);
    dateElement.innerText = date.getDate();
  });
}

nextMonthButton.addEventListener('click', () => {
  currentDate = addMonths(currentDate, 1);
  setupDatePicker();
});

prevMonthButton.addEventListener('click', () => {
  currentDate = subMonths(currentDate, 1);
  setupDatePicker();
});

function setDate(date) {
  datePickerButton.innerText = format(date, 'PPP');
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

setDate(new Date());
