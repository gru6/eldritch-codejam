import { cardsData as GreenCardsDate } from './data/mythicCards/green/index'
import { cardsData as BrownCardsDate } from './data/mythicCards/brown/index'
import { cardsData as BlueCardsDate } from './data/mythicCards/blue/index'
import '../src/style.css'
const body = document.querySelector('body');
const AllAncientCard = document.querySelectorAll('.ancient-card')
const AncientCard = document.querySelector('.ancient-card')

const AllDifficulty = document.querySelectorAll('.difficulty')
const difficultyCard = document.querySelector('.difficulty')

const currentState = document.querySelector('.current-state')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const shaffle = document.querySelector('.shaffle')


//chose Anciend card
body.addEventListener('click', (e) => {
  const event = e.target;
  if (event.classList.contains('ancient-card')) {
    for (let i = 0; i < AllAncientCard.length; i++) {
      AllAncientCard[i].classList.remove('active')
    }
    event.classList.add('active')
  }
})

//chose difficulty
body.addEventListener('click', (e) => {
  const event = e.target;
  if (event.classList.contains('difficulty')) {
    for (let i = 0; i < AllDifficulty.length; i++) {
      AllDifficulty[i].classList.remove('active-btn')
    }
    event.classList.add('active-btn')
  }
})



shaffle.addEventListener('click', (e) => {
  shaffle.classList.add('hidden')
  currentState.classList.remove('hidden')
  deck.classList.remove('hidden')
  lastCard.classList.remove('hidden')
})



//берем все green(brown, blue)  и выбираем из них 5(9, 2) easy if easy закончились то normal
//выбрать карты для каждого этапа и смешать их(получится 3 колоды разных цветов и сложности)
//положить 1 колоду сверху под нее 2 этап и под них 3 этап

let allCardsData = [...GreenCardsDate, ...BrownCardsDate, ...BlueCardsDate]; //all green cards как получить?
let SubDeck1 = [];
let SubDeck2 = [];
let SubDeck3 = [];




// массив объектов green(brown, blue) easy (normal, hard) карт
var greenEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'green');
});

var brownEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'brown');
});

var blueEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'blue');
});

var greenNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'green');
});

var brownNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'brown');
});

var blueNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'blue');
});

var greenHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'green');
});

var brownHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'brown');
});

var blueHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'blue');
});

//make AzathothCardsData
let AzathothGreen = 5;
let AzathothBrown = 9;
let AzathothBlue = 2;
let AzathothAllCards = []; //собераем колоду для Азатота


// veryeasy for AzathothGreen
while (AzathothGreen) {
  for (let i = 0; i < greenEasy.length; i++) {
    AzathothAllCards.push(greenEasy[i]);
    AzathothGreen = AzathothGreen - 1;
  }
  if (AzathothGreen > 0) {
    for (let j = 0; j < greenNormal.length; j++) {
      SubDeck1.push(greenNormal[j]);
      AzathothGreen = AzathothGreen - 1;
    }
  }
}

// veryeasy for AzathothBrown
while (AzathothBrown) {
  for (let i = 0; i < brownEasy.length; i++) {
    AzathothAllCards.push(brownEasy[i]);
    AzathothBrown = AzathothBrown - 1;
  }
  if (AzathothBrown > 0) {
    for (let j = 0; j < brownNormal.length; j++) {
      AzathothAllCards.push(brownNormal[j]);
      AzathothBrown = AzathothBrown - 1;
    }
  }
}

// veryeasy for AzathothBlue
while (AzathothBlue) {
  for (let i = 0; i < blueEasy.length; i++) {
    AzathothAllCards.push(blueEasy[i]);
    AzathothBlue = AzathothBlue - 1;
  }
  if (AzathothBlue > 0) {
    for (let j = 0; j < blueNormal.length; j++) {
      AzathothAllCards.push(blueNormal[j]);
      AzathothBlue = AzathothBlue - 1;
    }
  }
}

/* 
//very easy constructor
function (name, ) {

  while (HeroGreen) {
    for (let i = 0; i < greenEasy.length; i++) {
      AzathothAllCards.push(greenEasy[i]);
      AzathothGreen = AzathothGreen - 1;
    }
    if (AzathothGreen > 0) {
      for (let j = 0; j < greenNormal.length; j++) {
        SubDeck1.push(greenNormal[j]);
        AzathothGreen = AzathothGreen - 1;
      }
    }
  }
} */


/* function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
} */