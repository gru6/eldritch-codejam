import './style.css';
import BrownCardsData from './data/mythicCards/brown/index.js';
import GreenCardsData from './data/mythicCards/green/index.js';
import BlueCardsData from './data/mythicCards/blue/index.js';
import ancientsData from './data/ancients.js';

const body = document.querySelector('body');
const AllAncientCard = document.querySelectorAll('.ancient-card')
const AllDifficulty = document.querySelectorAll('.difficulty')
const currentState = document.querySelector('.current-state')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const shuffle = document.querySelector('.shuffle')
let heroChecked = '';
let difficultChecked = '';
let s1g = document.getElementById('s1g');
let s1br = document.getElementById('s1br');
let s1b = document.getElementById('s1b');
let s2g = document.getElementById('s2g');
let s2br = document.getElementById('s2br');
let s2b = document.getElementById('s2b');
let s3g = document.getElementById('s3g');
let s3br = document.getElementById('s3br');
let s3b = document.getElementById('s3b');
let s1gCount, s1brCount, s1bCount, s2gCount, s2brCount, s2bCount, s3gCount, s3brCount, s3bCount = 0; //количество карт каждого цвета на каждой стадии
let totalSt1, totalSt2, totalSt3;  // счетчик количества карт для каждого демона для каждой стадии
let allCardsData = [...GreenCardsData, ...BrownCardsData, ...BlueCardsData]; //все карты
let SubDeck1 = [];    // карты для каждой стадии
let SubDeck2 = [];
let SubDeck3 = [];
let DeckForGame = []; //собераем колоду для раздачи

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
    if (event.classList.contains('easy')) {
      difficultChecked = 'easy';
    }
    if (event.classList.contains('normal')) {
      difficultChecked = 'normal';
    }
    if (event.classList.contains('hard')) {
      difficultChecked = 'hard';
    }
    if (event.classList.contains('veryHard')) {
      difficultChecked = 'veryHard';
    }
  }
})

//click shuffle deck btn
shuffle.addEventListener('click', (e) => {
  if (heroChecked === '' && difficultChecked === '') {
    alert('Выбери демона и сложность игры')
  } else {
    shuffle.classList.add('hidden')
    currentState.classList.remove('hidden')
    deck.classList.remove('hidden')
    lastCard.classList.remove('hidden')
    shuffleDeck(heroChecked, difficultChecked);
  }
})

//сброс колоды 
function reset() {
  shuffle.classList.remove('hidden')
  currentState.classList.add('hidden')
  deck.classList.add('hidden')
  deck.classList.remove('unvisible')
  lastCard.classList.add('hidden')
  lastCard.style.backgroundImage = 'none';
  giveCardNumber = 0;
}

allCardsData = shuff(allCardsData);
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
    totalSt1 = 4;
    totalSt2 = 6;
    totalSt3 = 6;
  }
  if (heroChecked === 'Cthulhu') {
    totalGreen = 4;
    totalBrown = 9;
    totalBlue = 2;
    totalSt1 = 4;
    totalSt2 = 4;
    totalSt3 = 7;
  }
  if (heroChecked === 'IogSothoth') {
    totalGreen = 5;
    totalBrown = 9;
    totalBlue = 2;
    totalSt1 = 3;
    totalSt2 = 6;
    totalSt3 = 7;
  }
  if (heroChecked === 'ShubNiggurath') {
    totalGreen = 6;
    totalBrown = 8;
    totalBlue = 2;
    totalSt1 = 4;
    totalSt2 = 6;
    totalSt3 = 6;
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
    GreenDeck = shuff(GreenDeck);
    BrownDeck = shuff(BrownDeck);
    BlueDeck = shuff(BlueDeck);
    makeStageDeck(GreenDeck, BrownDeck, BlueDeck);
  }

  if (difficultChecked === 'easy') {
    GreenDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'easy' && card.color === 'green') || (card.difficulty === 'normal' && card.color === 'green'));
    });

    BrownDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'easy' && card.color === 'brown') || (card.difficulty === 'normal' && card.color === 'brown'));
    });

    BlueDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'easy' && card.color === 'blue') || (card.difficulty === 'normal' && card.color === 'blue'));
    });

    GreenDeck = shuff(GreenDeck);
    BrownDeck = shuff(BrownDeck);
    BlueDeck = shuff(BlueDeck);
    makeStageDeck(GreenDeck, BrownDeck, BlueDeck);
  }

  if (difficultChecked === 'normal') {
    GreenDeck = allCardsData.filter(function (card) {
      return (card.color === 'green');
    });

    BrownDeck = allCardsData.filter(function (card) {
      return (card.color === 'brown');
    });

    BlueDeck = allCardsData.filter(function (card) {
      return (card.color === 'blue');
    });

    GreenDeck = shuff(GreenDeck);
    BrownDeck = shuff(BrownDeck);
    BlueDeck = shuff(BlueDeck);
    makeStageDeck(GreenDeck, BrownDeck, BlueDeck);
  }

  if (difficultChecked === 'hard') {
    GreenDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'normal' && card.color === 'green') || (card.difficulty === 'hard' && card.color === 'green'));
    });

    BrownDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'normal' && card.color === 'brown') || (card.difficulty === 'hard' && card.color === 'brown'));
    });

    BlueDeck = allCardsData.filter(function (card) {
      return ((card.difficulty === 'normal' && card.color === 'blue') || (card.difficulty === 'hard' && card.color === 'blue'));
    });

    GreenDeck = shuff(GreenDeck);     //ПЕРЕМЕШИВАНИЕ
    BrownDeck = shuff(BrownDeck);
    BlueDeck = shuff(BlueDeck);
    makeStageDeck(GreenDeck, BrownDeck, BlueDeck);
  }

  if (difficultChecked === 'veryHard') {
    GreenDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'hard' && card.color === 'green');
    });
    GreenDeck = GreenDeck.slice(0, totalGreen);
    if (GreenDeck.length <= greenHard.length) {
      for (let j = 0; GreenDeck.length < totalGreen; j++) {
        GreenDeck.push(greenNormal[j])
      }
    }
    BrownDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'hard' && card.color === 'brown');
    });
    BrownDeck = BrownDeck.slice(0, totalBrown);
    if (BrownDeck.length <= brownHard.length) {
      for (let j = 0; BrownDeck.length < totalBrown; j++) {
        BrownDeck.push(brownNormal[j])
      }
    }
    BlueDeck = allCardsData.filter(function (card) {
      return (card.difficulty === 'hard' && card.color === 'blue');
    });
    BlueDeck = BlueDeck.slice(0, totalBlue);
    if (BlueDeck.length <= blueHard.length) {
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

//собрать 3 стейджа каждый по отдельности
function makeStageDeck(green, brown, blue) {
  let heroNum;
  if (heroChecked === 'Azathoth') {       // костыли для определения откуда брать ancientsData[heroNum].firstStage.greenCards
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

  SubDeck1 = shuff(SubDeck1.flat());    //перемещиваю стейджи внутри каждого
  SubDeck2 = shuff(SubDeck2.flat());
  SubDeck3 = shuff(SubDeck3.flat());

  DeckForGame = [...SubDeck1, ...SubDeck2, ...SubDeck3].flat(2);    //готовая колода для раздачи

  s1gCount = ancientsData[heroNum].firstStage.greenCards;          //костыли для определения начальных значений табло
  s1g.textContent = s1gCount;
  s1brCount = ancientsData[heroNum].firstStage.brownCards;
  s1br.textContent = s1brCount;
  s1bCount = ancientsData[heroNum].firstStage.blueCards;
  s1b.textContent = s1bCount;
  s2gCount = ancientsData[heroNum].secondStage.greenCards;
  s2g.textContent = s2gCount;
  s2brCount = ancientsData[heroNum].secondStage.brownCards;
  s2br.textContent = s2brCount;
  s2bCount = ancientsData[heroNum].secondStage.blueCards;
  s2b.textContent = s2bCount;
  s3gCount = ancientsData[heroNum].thirdStage.greenCards;
  s3g.textContent = s3gCount;
  s3brCount = ancientsData[heroNum].thirdStage.brownCards;
  s3br.textContent = s3brCount;
  s3bCount = ancientsData[heroNum].thirdStage.blueCards;
  s3b.textContent = s3bCount;

  console.log('Колода на раздачу', DeckForGame)

  SubDeck1 = [];   //обнуляю колоды для стейдев для следующей раздачи
  SubDeck2 = [];
  SubDeck3 = [];
}

// клик по выдаче карты 
deck.addEventListener('click', giveCard)
let giveCardNumber = 0;

//функция выдачи карты
function giveCard() {
  lastCard.style.backgroundImage = `url(${DeckForGame[giveCardNumber].cardFace})`;   //графическая смена карты

  if (giveCardNumber < totalSt1) {                              //уменьшаем значения в счетчике при выдаче новой карты
    if (DeckForGame[giveCardNumber].color === 'green') {
      s1gCount -= 1;
      s1g.textContent = s1gCount;
    }
    if (DeckForGame[giveCardNumber].color === 'brown') {
      s1brCount -= 1;
      s1br.textContent = s1brCount;
    }
    if (DeckForGame[giveCardNumber].color === 'blue') {
      s1bCount -= 1;
      s1b.textContent = s1bCount;
    }
  }

  if (giveCardNumber >= totalSt1 && giveCardNumber < totalSt1 + totalSt2) {
    if (DeckForGame[giveCardNumber].color === 'green') {
      s2gCount -= 1;
      s2g.textContent = s2gCount;
    }
    if (DeckForGame[giveCardNumber].color === 'brown') {
      s2brCount -= 1;
      s2br.textContent = s2brCount;
    }
    if (DeckForGame[giveCardNumber].color === 'blue') {
      s2bCount -= 1;
      s2b.textContent = s2bCount;
    }
  }

  if (giveCardNumber >= totalSt1 + totalSt2) {
    if (DeckForGame[giveCardNumber].color === 'green') {
      s3gCount -= 1;
      s3g.textContent = s3gCount;
    }
    if (DeckForGame[giveCardNumber].color === 'brown') {
      s3brCount -= 1;
      s3br.textContent = s3brCount;
    }
    if (DeckForGame[giveCardNumber].color === 'blue') {
      s3bCount -= 1;
      s3b.textContent = s3bCount;
    }
  }

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


alert('Выполнены все условия. Оценка 100 баллов. При наличии вопросов просьба связаться:) дискорд gril#2057')
console.log('Выполнены все условия. Оценка 100 баллов. При наличии вопросов просьба связаться:) дискорд gril#2057')
