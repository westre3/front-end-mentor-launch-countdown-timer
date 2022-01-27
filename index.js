animateCardFlip = (cardSelector, flipDuration, newValue) => {
  let card = document.querySelector(cardSelector);
  let cardTop = document.querySelector(cardSelector + ' .card-top-position');
  let cardTopText = document.querySelector(cardSelector + ' .card-top-position p');
  let cardBottom = document.querySelector(cardSelector + ' .card-bottom-position');
  let cardBottomText = document.querySelector(cardSelector + ' .card-bottom-position p');

  // Create new card top
  let newCardTop = document.createElement('div');
  newCardTop.className = 'card-half new-card-top-position card-top-style top-borders';
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
    cardTop.classList.remove('top-borders');
    cardTop.classList.add('card-bottom-position');
    cardTop.classList.add('bottom-borders');
    cardTopText.style.transform = '';
    newCardTop.classList.remove('new-card-top-position');
    newCardTop.classList.add('card-top-position');
  }, flipDuration);
};

let flipDuration = 500;
let flipDelay = 1000;

document.documentElement.style.setProperty('--flip-duration', `${flipDuration}ms`);

// for (let i = 0; i < 120; i++) {
//   setTimeout(animateCardFlip, i * flipDelay, '.card-1', flipDuration, String((120 - i - 1) % 60).padStart(2, '0'));
// }

// flipDuration = 500;
// flipDelay = 60 * 1000;

// for (let i = 0; i < 60; i++) {
//   setTimeout(animateCardFlip, i * flipDelay, '.card-2', flipDuration, String(60 - i - 1).padStart(2, '0'));
// }
