import { AsyncStorage } from "react-native"
export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}


export function getDecks(deck) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      if (results === null) {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
        return initialData
      } else {
        return JSON.parse(results)
      }
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      questions: [],
    }
  }))
}

export function addNewCard(title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      let questionList = decks[title].questions
      AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          questions: [...questionList, card]
        }
      }))
    })
}