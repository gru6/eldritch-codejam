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
    if (event.classList.contains('Cthulhu')) {
      heroChecked = 'Cthulhu';
    }
    if (event.classList.contains('IogSothoth')) {
      heroChecked = 'IogSothoth';
    }
    if (event.classList.contains('ShubNiggurath')) {
      heroChecked = 'ShubNiggurath';
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
  lastCard.style.backgroundImage = 'none';
  giveCardNumber = 0;

}


//берем все green(brown, blue)  и выбираем из них 5(9, 2) easy if easy закончились то normal
//выбрать карты для каждого этапа и смешать их(получится 3 колоды разных цветов и сложности)
//положить 1 колоду сверху под нее 2 этап и под них 3 этап

let allCardsData = [...GreenCardsData, ...BrownCardsData, ...BlueCardsData];
allCardsData = shuff(allCardsData);
let SubDeck1 = [];
let SubDeck2 = [];
let SubDeck3 = [];
let DeckForGame = []; //собераем колоду для раздачи

function shuffleDeck(heroChecked, difficultChecked) {
  let totalGreen;
  let totalBrown;
  let totalBlue;
  let GreenDeck = [];
  let BrownDeck = [];
  let BlueDeck = [];

  if (heroChecked === 'Azathoth') {
    totalGreen = 5;
    totalBrown = 9;
    totalBlue = 2;
  }
  if (heroChecked === 'Cthulhu') {
    totalGreen = 4;
    totalBrown = 9;
    totalBlue = 2;
  }
  if (heroChecked === 'IogSothoth') {
    totalGreen = 5;
    totalBrown = 9;
    totalBlue = 2;
  }
  if (heroChecked === 'ShubNiggurath') {
    totalGreen = 6;
    totalBrown = 8;
    totalBlue = 2;
  }

  if (difficultChecked === 'veryEasy') {
    GreenDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'easy' && card.color === 'green');
    });
    GreenDeck = GreenDeck.slice(0, totalGreen);
    if (GreenDeck.length <= greenEasy.length) {
      for (let j = 0; GreenDeck.length < totalGreen; j++) {
        GreenDeck.push(greenNormal[j])
      }
    }
    BrownDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'easy' && card.color === 'brown');
    });
    BrownDeck = BrownDeck.slice(0, totalBrown);
    if (BrownDeck.length <= brownEasy.length) {
      for (let j = 0; BrownDeck.length < totalBrown; j++) {
        BrownDeck.push(brownNormal[j])
      }
    }
    BlueDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'easy' && card.color === 'blue');
    });
    BlueDeck = BlueDeck.slice(0, totalBlue);
    if (BlueDeck.length <= blueEasy.length) {
      for (let j = 0; BlueDeck.length < totalBlue; j++) {
        BlueDeck.push(blueNormal[j])
      }
    }
    GreenDeck = shuff(GreenDeck);     //ПЕРЕМЕШИВАНИЕ
    BrownDeck = shuff(BrownDeck);
    BlueDeck = shuff(BlueDeck);
    makeStageDeck(GreenDeck, BrownDeck, BlueDeck);
  }

}

//собрать 3 стейджа 
function makeStageDeck(green, brown, blue) {
  let heroNum;
  if (heroChecked === 'Azathoth') {
    heroNum = 0;
  }
  if (heroChecked === 'Cthulhu') {
    heroNum = 1;
  }
  if (heroChecked === 'IogSothoth') {
    heroNum = 2;
  }
  if (heroChecked === 'ShubNiggurath') {
    heroNum = 3;
  }

  SubDeck1.push(green.splice(0, ancientsData[heroNum].firstStage.greenCards));
  SubDeck2.push(green.splice(0, ancientsData[heroNum].secondStage.greenCards));
  SubDeck3.push(green.splice(0, ancientsData[heroNum].thirdStage.greenCards));

  SubDeck1.push(brown.splice(0, ancientsData[heroNum].firstStage.brownCards));
  SubDeck2.push(brown.splice(0, ancientsData[heroNum].secondStage.brownCards));
  SubDeck3.push(brown.splice(0, ancientsData[heroNum].thirdStage.brownCards));

  SubDeck1.push(blue.splice(0, ancientsData[heroNum].firstStage.blueCards));
  SubDeck2.push(blue.splice(0, ancientsData[heroNum].secondStage.blueCards));
  SubDeck3.push(blue.splice(0, ancientsData[heroNum].thirdStage.blueCards));

  DeckForGame = [...SubDeck1, ...SubDeck2, ...SubDeck3].flat(2);
  SubDeck1 = [];
  SubDeck2 = [];
  SubDeck3 = [];
  console.log('Калода на раздачу', DeckForGame)
}


// выдача карт 
deck.addEventListener('click', giveCard)
let giveCardNumber = 0;
function giveCard() {
  lastCard.style.backgroundImage = `url(${DeckForGame[giveCardNumber].cardFace})`;
  console.log(`Последняя карта:${DeckForGame[giveCardNumber].id} ${DeckForGame[giveCardNumber].difficulty}`);
  giveCardNumber += 1;
  if (giveCardNumber === DeckForGame.length) {
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


function shuff(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
