import './style.css';
import BrownCardsData from './data/mythicCards/brown/index.js';
import GreenCardsData from './data/mythicCards/green/index.js';
import BlueCardsData from './data/mythicCards/blue/index.js';


const body = document.querySelector('body');
const AllAncientCard = document.querySelectorAll('.ancient-card')
const AncientCard = document.querySelector('.ancient-card')
const AllDifficulty = document.querySelectorAll('.difficulty')
const difficultyCard = document.querySelector('.difficulty')
const currentState = document.querySelector('.current-state')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const shaffle = document.querySelector('.shaffle')
let heroChecked;
let difficultChecked;


//chose Anciend card
body.addEventListener('click', (e) => {
  const event = e.target;
  if (event.classList.contains('ancient-card')) {
    for (let i = 0; i < AllAncientCard.length; i++) {
      AllAncientCard[i].classList.remove('active')
    }
    event.classList.add('active')
    if (event.classList.contains('Azathoth')) {
      heroChecked = 'Azathoth';
    }
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
    if (event.classList.contains('veryEasy')) {
      difficultChecked = 'veryEasy';
    }
  }
})
//click shaffle
shaffle.addEventListener('click', (e) => {
  shaffle.classList.add('hidden')
  currentState.classList.remove('hidden')
  deck.classList.remove('hidden')
  lastCard.classList.remove('hidden')
  shaffleDeck(heroChecked, difficultChecked);
})



//берем все green(brown, blue)  и выбираем из них 5(9, 2) easy if easy закончились то normal
//выбрать карты для каждого этапа и смешать их(получится 3 колоды разных цветов и сложности)
//положить 1 колоду сверху под нее 2 этап и под них 3 этап

let allCardsData = [...GreenCardsData, ...BrownCardsData, ...BlueCardsData];
let SubDeck1 = [];
let SubDeck2 = [];
let SubDeck3 = [];
let AzathothAllCards = []; //собераем колоду для Азатота
let AzathothGreen = []; //5
let AzathothBrown = []; //9
let AzathothBlue = []; //2

function shaffleDeck(heroChecked, difficultChecked) {

  if (heroChecked === 'Azathoth') {

    if (difficultChecked === 'veryEasy') {
      AzathothGreen = allCardsData.filter(function (card) {
        return (card.difficulty === 'easy' && card.color === 'green');
      });
      AzathothGreen = AzathothGreen.slice(0, 5);
      if (AzathothGreen.length <= greenEasy.length) {
        for (let j = 0; AzathothGreen.length < 5; j++) {
          AzathothGreen.push(greenNormal[j])
        }
      }
      AzathothBrown = allCardsData.filter(function (card) {
        return (card.difficulty === 'easy' && card.color === 'brown');
      });
      AzathothBrown = AzathothBrown.slice(0, 9);
      if (AzathothBrown.length <= brownEasy.length) {
        for (let j = 0; AzathothBrown.length < 9; j++) {
          AzathothBrown.push(brownNormal[j])
        }
      }
      AzathothBlue = allCardsData.filter(function (card) {
        return (card.difficulty === 'easy' && card.color === 'blue');
      });
      AzathothBlue = AzathothBlue.slice(0, 2);
      if (AzathothBlue.length <= blueEasy.length) {
        for (let j = 0; AzathothBlue.length < 2; j++) {
          AzathothBlue.push(blueNormal[j])
        }
      }
      makeStageDeck(AzathothGreen, AzathothBrown, AzathothBlue);
    }



    console.log(AzathothAllCards);
  }
}

//собрать 3 стейджа 
/* function makeStageDeck(green, brown, blue) {
  for (let i = 0; green.length > 0 && brown.length > 0 && blue.length > 0; i++) {
    SubDeck1 = green.slice(1);
  }
  if   
  
  SubDeck1 = green.pop() + blue.pop() + brown.pop() + brown.pop();
  SubDeck2 = ....
  SubDeck3
  ancientsData[0].firstStage[greenCards] // обращение к greenCards: 1,

} */




// массив объектов green(brown, blue) easy (normal, hard) карт перетосованы
var greenEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'green');
});
shuffle(greenEasy);

var brownEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'brown');
});
shuffle(brownEasy);
var blueEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'blue');
});
shuffle(blueEasy);
var greenNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'green');
});
shuffle(greenNormal);
var brownNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'brown');
});
shuffle(brownNormal);
var blueNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'blue');
});
shuffle(blueNormal);
var greenHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'green');
});
shuffle(greenHard);
var brownHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'brown');
});
shuffle(brownHard);
var blueHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'blue');
});
shuffle(blueHard);
//make AzathothCardsData




// veryeasy for Azathoth
/* while (AzathothGreen) {
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
} */


/* 
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
} */

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


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
