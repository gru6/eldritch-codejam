import './style.css';
import BrownCardsData from './data/mythicCards/brown/index.js';
import GreenCardsData from './data/mythicCards/green/index.js';
import BlueCardsData from './data/mythicCards/blue/index.js';
import ancientsData from './data/ancients.js';

const body = document.querySelector('body');
const AllAncientCard = document.querySelectorAll('.ancient-card')
const AncientCard = document.querySelector('.ancient-card')
const AllDifficulty = document.querySelectorAll('.difficulty')
const difficultyCard = document.querySelector('.difficulty')
const currentState = document.querySelector('.current-state')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const shuffle = document.querySelector('.shuffle')
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
    reset();
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
    reset();
    if (event.classList.contains('veryEasy')) {
      difficultChecked = 'veryEasy';
    }
  }
})

//click shuffle deck
shuffle.addEventListener('click', (e) => {
  shuffle.classList.add('hidden')
  currentState.classList.remove('hidden')
  deck.classList.remove('hidden')
  lastCard.classList.remove('hidden')
  shuffleDeck(heroChecked, difficultChecked);
})

function reset() {
  shuffle.classList.remove('hidden')
  currentState.classList.add('hidden')
  deck.classList.add('hidden')
  deck.classList.remove('unvisible')
  lastCard.classList.add('hidden')
  AzathothAllCards = [];
  lastCard.style.backgroundImage = 'none';
  giveCardNumber = 0;

}


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

function shuffleDeck(heroChecked, difficultChecked) {
  AzathothAllCards = [];
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








  }
}

//собрать 3 стейджа 
function makeStageDeck(green, brown, blue) {
  if (heroChecked === 'Azathoth') {

    SubDeck1.push(green.splice(-ancientsData[0].firstStage.greenCards));
    SubDeck2.push(green.splice(-ancientsData[0].secondStage.greenCards));
    SubDeck3.push(green.splice(-ancientsData[0].thirdStage.greenCards));

    SubDeck1.push(brown.splice(-ancientsData[0].firstStage.brownCards));
    SubDeck2.push(brown.splice(-ancientsData[0].secondStage.brownCards));
    SubDeck3.push(brown.splice(-ancientsData[0].thirdStage.brownCards));

    SubDeck1.push(blue.splice(-ancientsData[0].firstStage.blueCards));
    SubDeck2.push(blue.splice(-ancientsData[0].secondStage.blueCards));
    SubDeck3.push(blue.splice(-ancientsData[0].thirdStage.blueCards));

  }
  // TODO SubDeck1 SubDeck2 SubDeck3 перемешать надо
  /*   SubDeck3 = SubDeck3.map(function (deck) {
      deck.sort(() => Math.random() - 0.5);
    })
    console.log(SubDeck3); */

  AzathothAllCards = [...SubDeck1, ...SubDeck2, ...SubDeck3].flat(2);
  SubDeck1 = [];
  SubDeck2 = [];
  SubDeck3 = [];
  console.log(AzathothAllCards)

}


// выдача карт 
deck.addEventListener('click', giveCard)
let giveCardNumber = 0;
function giveCard() {
  lastCard.style.backgroundImage = `url(${AzathothAllCards[giveCardNumber].cardFace})`;
  console.log(`Последняя карта:${AzathothAllCards[giveCardNumber].id} ${AzathothAllCards[giveCardNumber].difficulty}`);
  giveCardNumber += 1;
  if (giveCardNumber === AzathothAllCards.length) {
    deck.classList.add('unvisible');
  }
}



// массив объектов green(brown, blue) easy (normal, hard) карт перетосованы
var greenEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'green');
});
shuff(greenEasy);

var brownEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'brown');
});
shuff(brownEasy);
var blueEasy = allCardsData.filter(function (card) {
  return (card.difficulty === 'easy' && card.color === 'blue');
});
shuff(blueEasy);
var greenNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'green');
});
shuff(greenNormal);
var brownNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'brown');
});
shuff(brownNormal);
var blueNormal = allCardsData.filter(function (card) {
  return (card.difficulty === 'normal' && card.color === 'blue');
});
shuff(blueNormal);
var greenHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'green');
});
shuff(greenHard);
var brownHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'brown');
});
shuff(brownHard);
var blueHard = allCardsData.filter(function (card) {
  return (card.difficulty === 'hard' && card.color === 'blue');
});
shuff(blueHard);


function shuff(deck) {
  deck.sort(() => Math.random() - 0.5);
}
