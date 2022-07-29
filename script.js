const trivia = document.getElementById('app')
const scoreDisplay = document.getElementById('score')


let score = 0

const genres = [
    {
        name: 'General Knowledge',
        id: 9
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Books',
        id: 9
    }
]

const levels = ['easy', 'medium', 'hard']

function addGenre(genre) {
    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    trivia.append(column)

    levels.forEach(level => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (level === 'easy') {
            card.innerHTML = 100
        }
        if (level === 'medium') {
            card.innerHTML = 200
        }
        if (level === 'hard') {
            card.innerHTML = 300
        }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data => {

                console.log(data)
                card.setAttribute('data-question', data.results[0].question)
                card.setAttribute('data-answer', data.results[0].correct_answer)
                card.setAttribute('data-value', card.getInnerHTML())
            })
            .then(done => card.addEventListener('click', flipCard))

    })
}
genres.forEach(genre => addGenre(genre))

function flipCard() {
 const trueButton = document.createElement('button')
 const falseButton = document.createElement('button')
 const textDisplay = document.createElement('div')
 trueButton.innerHTML = "True"
 falseButton.innerHTML = "False"
 textDisplay.innerHTML = this.getAttribute('data-question')

 this.append(textDisplay,trueButton,falseButton)

  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach(card => card.removeEventListener('click', flipCard)) //removing already clicked cards
}
