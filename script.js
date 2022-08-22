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
