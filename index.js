const flipDelay = 1000;
const flipDuration = 500;
const secondsPerMinute = 60;
const secondsPerHour = secondsPerMinute * 60;
const secondsPerDay = secondsPerHour * 24;
const daysSelector = '.days-card';
const hoursSelector = '.hours-card';
const minutesSelector = '.minutes-card';
const secondsSelector = '.seconds-card';

let countDownSeconds = 7 * secondsPerDay;

const animateCardFlip = (cardSelector, flipDuration, newValue) => {
  let card = document.querySelector(cardSelector);
  let cardTop = document.querySelector(cardSelector + ' .card-top-position');
  let cardTopText = document.querySelector(cardSelector + ' .card-top-position p');
  let cardBottom = document.querySelector(cardSelector + ' .card-bottom-position');
  let cardBottomText = document.querySelector(cardSelector + ' .card-bottom-position p');

  // Create new card top
  let newCardTop = document.createElement('div');
  newCardTop.className = 'card-half new-card-top-position card-top-style card-top-borders';
  let newCardTopText = document.createElement('p');
  newCardTopText.innerHTML = newValue;
  newCardTop.appendChild(newCardTopText);
  card.appendChild(newCardTop);

  // animate flip
  cardTop.style.animation = `flip forwards ${flipDuration}ms linear`;

  // at halfway point, change cardTopText since now it will appear
  // on the card's bottom
  setTimeout(() => {
    cardTop.classList.add('card-bottom-style');
    cardTop.classList.remove('card-top-style');
    cardTopText.innerHTML = newValue;
    cardTopText.style.transform = 'translateY(50%) rotateX(180deg)';
  }, flipDuration / 2);

  // once animation is complete, delete cardBottom, make cardTop
  // cardBottom, and make the newCardTop cardTop
  setTimeout(() => {
    card.removeChild(cardBottom);
    cardTop.style.animation = '';
    cardTop.classList.remove('card-top-position');
    cardTop.classList.remove('card-top-borders');
    cardTop.classList.add('card-bottom-position');
    cardTop.classList.add('card-bottom-borders');
    cardTopText.style.transform = '';
    newCardTop.classList.remove('new-card-top-position');
    newCardTop.classList.add('card-top-position');
  }, flipDuration);
};

const computeTimeValues = (secondsInput) => {
  let secondsLeft = secondsInput;
  const days = Math.floor(countDownSeconds / secondsPerDay);
  secondsLeft -= days * secondsPerDay;

  const hours = Math.floor(secondsLeft / secondsPerHour);
  secondsLeft -= hours * secondsPerHour;

  const minutes = Math.floor(secondsLeft / secondsPerMinute);
  secondsLeft -= minutes * secondsPerMinute;

  const seconds = secondsLeft;

  return [days, hours, minutes, seconds];
};

let [daysDisplay, hoursDisplay, minutesDisplay, secondsDisplay] = computeTimeValues(countDownSeconds);
document
  .querySelectorAll(daysSelector + ' p')
  .forEach((text) => (text.innerHTML = String(daysDisplay).padStart(2, '0')));
document
  .querySelectorAll(hoursSelector + ' p')
  .forEach((text) => (text.innerHTML = String(hoursDisplay).padStart(2, '0')));
document
  .querySelectorAll(minutesSelector + ' p')
  .forEach((text) => (text.innerHTML = String(minutesDisplay).padStart(2, '0')));
document
  .querySelectorAll(secondsSelector + ' p')
  .forEach((text) => (text.innerHTML = String(secondsDisplay).padStart(2, '0')));

const intervalId = setInterval(() => {
  countDownSeconds--;

  let [days, hours, minutes, seconds] = computeTimeValues(countDownSeconds);

  if (countDownSeconds >= 0) {
    if (days !== daysDisplay) {
      daysDisplay = days;
      animateCardFlip(daysSelector, flipDuration, String(daysDisplay).padStart(2, '0'));
    }
    if (hours != hoursDisplay) {
      hoursDisplay = hours;
      animateCardFlip(hoursSelector, flipDuration, String(hoursDisplay).padStart(2, '0'));
    }
    if (minutes != minutesDisplay) {
      minutesDisplay = minutes;
      animateCardFlip(minutesSelector, flipDuration, String(minutesDisplay).padStart(2, '0'));
    }
    if (seconds != secondsDisplay) {
      secondsDisplay = seconds;
      animateCardFlip(secondsSelector, flipDuration, String(secondsDisplay).padStart(2, '0'));
    }
  }

  if (countDownSeconds === 0) {
    clearInterval(intervalId);
  }
}, flipDelay);
