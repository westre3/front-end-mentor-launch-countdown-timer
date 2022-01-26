const card = document.querySelector('.card');
let cardTop = document.querySelector('.card-top-position');
let cardTopText = document.querySelector('.card-top-position p');
let cardBottom = document.querySelector('.card-bottom-position');
let cardBottomText = document.querySelector('.card-bottom-position p');

const flipDuration = 500;
const flipDelay = 500;
document.documentElement.style.setProperty('--flip-duration', `${flipDuration}ms`);

animateCardFlip = () => {
  // Create new card top
  let newCardTop = document.createElement('div');
  newCardTop.className = 'card-half new-card-top-position card-top-color';
  let newCardTopText = document.createElement('p');
  newCardTopText.innerHTML = String(Number(cardTopText.innerHTML) - 1);
  newCardTop.appendChild(newCardTopText);
  card.appendChild(newCardTop);

  // animate flip
  setTimeout(() => cardTop.classList.add('flip'), 0);

  // at halfway point, change cardTopText since now it will appear
  // on the card's bottom
  setTimeout(() => {
    cardTop.classList.remove('card-top-color');
    cardTop.classList.add('card-bottom-color');
    cardTopText.innerHTML = newCardTopText.innerHTML;
    cardTopText.style.transform = 'translateY(50%) rotateX(180deg)';
  }, flipDuration / 2);

  // once animation is complete, delete cardBottom, make cardTop
  // cardBottom, and make the newCardTop cardTop
  setTimeout(() => {
    card.removeChild(cardBottom);

    cardBottom = cardTop;
    cardBottomText = cardTopText;
    cardBottom.classList.remove('flip');
    cardBottom.classList.add('card-bottom-position');
    cardBottom.classList.remove('card-top-position');
    cardTopText.style.transform = '';

    cardTop = newCardTop;
    cardTopText = newCardTopText;
    cardTop.classList.remove('new-card-top-position');
    cardTop.classList.add('card-top-position');
  }, flipDuration);
};

const hide = (element) => {
  element.classList.remove('visible');
  element.classList.add('hidden');
};

const show = (element) => {
  element.classList.remove('hidden');
  element.classList.add('visible');
};

// for (let i = 0; i < 60; i++) {
//   setTimeout(animateCardFlip, i * (flipDuration + flipDelay));
// }
