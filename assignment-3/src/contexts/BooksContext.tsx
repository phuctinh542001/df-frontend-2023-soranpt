import { createContext, useReducer } from 'react'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage'
import { BooksContextType } from '../types/ContextTypes'

export const BooksContext = createContext<BooksContextType[]>([])
export const BooksDispatchContext = createContext<any>(null)

const booksReducer = (books, action) => {
  switch (action.type) {
    case 'create': {
      const newBooks = [
        ...books,
        {
          id: books.slice(-1)[0].id + 1,
          ...action.newBook,
        },
      ]
      setToLocalStorage('books', newBooks)
      return newBooks
    }
    case 'update': {
      const newBooks = books.map((book) => {
        if (book.id === action.bookUpdate.id) {
          return action.bookUpdate
        }
        return book
      })
      setToLocalStorage('books', newBooks)
      return newBooks
    }
    case 'delete': {
      const newBooks = books.filter((book) => {
        return book.id !== action.bookDelete.id
      })
      setToLocalStorage('books', newBooks)
      return newBooks
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}

export const BooksProvider = ({ children }) => {
  let data: BooksContextType[] = []
  const localDataBooks = getFromLocalStorage('books')

  if (!localDataBooks) {
    setToLocalStorage('books', initialBooks)
    data = initialBooks
  } else {
    data = localDataBooks
  }

  const [books, dispatch] = useReducer(booksReducer, data)
  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={dispatch}>
        {children}
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  )
}

const initialBooks = [
  {
    id: 100,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: 101,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: 102,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 103,
    name: 'Clean Code',
    author: 'Robert C. Martin',
    topic: 'Programming',
  },
  {
    id: 104,
    name: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    topic: 'Computer Science',
  },
  {
    id: 105,
    name: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    topic: 'Programming',
  },
  {
    id: 106,
    name: 'Database Systems: The Complete Book',
    author: 'Hector Garcia-Molina',
    topic: 'Database',
  },
  {
    id: 107,
    name: 'Continuous Delivery',
    author: 'Jez Humble, David Farley',
    topic: 'DevOps',
  },
  {
    id: 108,
    name: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    topic: 'Computer Science',
  },
  {
    id: 109,
    name: 'Code Complete',
    author: 'Steve McConnell',
    topic: 'Programming',
  },
  {
    id: 110,
    name: 'Data Science for Business',
    author: 'Foster Provost',
    topic: 'Data Science',
  },
  {
    id: 111,
    name: 'Site Reliability Engineering',
    author: 'Niall Richard Murphy',
    topic: 'DevOps',
  },
  {
    id: 112,
    name: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    topic: 'Programming',
  },
  {
    id: 113,
    name: 'Data Structures and Algorithms in Python',
    author: 'Michael T. Goodrich',
    topic: 'Computer Science',
  },
  {
    id: 114,
    name: 'Learning SQL',
    author: 'Alan Beaulieu',
    topic: 'Database',
  },
  {
    id: 115,
    name: 'Improving Software Quality and Reducing Risk',
    author: 'Paul M. Duvall',
    topic: 'DevOps',
  },
  {
    id: 116,
    name: 'Head First Design Patterns',
    author: 'Eric Freeman',
    topic: 'Programming',
  },
  {
    id: 117,
    name: 'Database Design for Mere Mortals',
    author: 'Michael J. Hernandez',
    topic: 'Database',
  },
  {
    id: 118,
    name: 'The DevOps Handbook',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 119,
    name: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    topic: 'Programming',
  },
  {
    id: 120,
    name: 'NoSQL Distilled',
    author: 'Pramod J. Sadalage',
    topic: 'Database',
  },
  {
    id: 121,
    name: 'Site Reliability Engineering Workbook',
    author: 'Niall Richard Murphy',
    topic: 'DevOps',
  },
  {
    id: 122,
    name: 'Introduction to the Theory of Computation',
    author: 'Michael Sipser',
    topic: 'Computer Science',
  },
  {
    id: 123,
    name: 'Python Crash Course',
    author: 'Eric Matthes',
    topic: 'Programming',
  },
  {
    id: 124,
    name: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    topic: 'Database',
  },
  {
    id: 125,
    name: 'The DevOps Handbook',
    author: 'Gene Kim, Patrick Debois',
    topic: 'DevOps',
  },
  {
    id: 126,
    name: '	JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    topic: 'Programming',
  },
  {
    id: 127,
    name: 'SQL Performance Explained',
    author: 'Markus Winand',
    topic: 'Database',
  },
  {
    id: 128,
    name: 'Continuous Delivery with Docker and Jenkins',
    author: 'Rafal Leszko',
    topic: 'DevOps',
  },
  {
    id: 129,
    name: 'The C Programming Language',
    author: 'Brian W. Kernighan',
    topic: 'Programming',
  },
  {
    id: 130,
    name: 'Hadoop: The Definitive Guide',
    author: 'Tom White',
    topic: 'Big Data',
  },
  {
    id: 131,
    name: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    topic: 'Programming',
  },
  {
    id: 132,
    name: 'Docker in Action',
    author: 'Jeff Nickoloff',
    topic: 'DevOps',
  },
]
