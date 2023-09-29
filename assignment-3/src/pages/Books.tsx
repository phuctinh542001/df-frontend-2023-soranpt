import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { BooksContext, BooksDispatchContext } from '../contexts/BooksContext'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage'
import { ThemeContext } from '../contexts/ThemeContext'
import Main from '../layouts/Main/Main'
import Search from '../components/common/Search/Search'
import Button from '../components/common/Button/Button'
import DataTable from '../components/common/DataTable/DataTable'
import Loading from '../components/common/Loading/Loading'
import ModalCreate from '../components/pages/Books/ModalCreate/ModalCreate'
import ModalUpdate from '../components/pages/Books/ModalUpdate/ModalUpdate'
import ModalDelete from '../components/pages/Books/ModalDelete/ModalDelete'
import { Book } from '../types/CommonTypes'

function Books() {
  const { theme, setTheme } = useContext(ThemeContext)
  const books = useContext(BooksContext)
  const dispatch = useContext(BooksDispatchContext)

  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)

  const dataTitle = ['Serial', 'Name', 'Author', 'Topic', 'Action']
  const [dataBooksShow, setDataBooksShow] = useState(books)
  const [currentPage, setCurrentPage] = useState(1)

  const [currentBookUpdate, setCurrentBookUpdate] = useState({
    name: '',
    author: '',
    topic: '',
  })
  const [currentBookDelete, setCurrentBookDelete] = useState<Book>({
    name: '',
    author: '',
    topic: '',
  })

  const [keywordSearch, setKeywordSearch] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    const setUp = async () => {
      setIsLoading(true)
      const localTheme = getFromLocalStorage('theme')

      if (!localTheme) {
        setToLocalStorage('theme', 'light')
      } else {
        setTheme(localTheme)
      }

      await new Promise((r) => {
        setTimeout(r, 600)
      })
      setIsLoading(false)
    }

    setUp()
  }, [setTheme, dispatch, books])

  useEffect(() => {
    const localPage = Number(getFromLocalStorage('page'))

    if (!localPage) {
      setToLocalStorage('page', currentPage)
    } else {
      setCurrentPage(localPage)
    }

    if (keywordSearch !== '') {
      const newDataBook = books.filter((book) => {
        return book.name.toLowerCase().includes(keywordSearch.toLowerCase())
      })

      handlePageChange(1)
      setDataBooksShow(newDataBook)
    } else {
      setDataBooksShow(books)
    }
  }, [currentPage, keywordSearch, books])

  const handleOpenModalUpdate = (currentBook) => {
    setCurrentBookUpdate({ ...currentBook })
    setIsShowModalUpdate(true)
  }

  const handleOpenModalDelete = (currentBook) => {
    setCurrentBookDelete({ ...currentBook })
    setIsShowModalDelete(true)
  }

  const handleCloseModal = () => {
    setIsShowModalCreate(false)
    setIsShowModalUpdate(false)
    setIsShowModalDelete(false)
  }

  const handleCreateBook = (newBook) => {
    dispatch({
      type: 'create',
      newBook,
    })
    setIsShowModalCreate(false)
  }

  const handleUpdateBook = (bookUpdate) => {
    dispatch({
      type: 'update',
      bookUpdate,
    })
    setIsShowModalUpdate(false)
  }

  const handleDeleteBook = (bookDelete) => {
    dispatch({
      type: 'delete',
      bookDelete,
    })
    setIsShowModalDelete(false)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setToLocalStorage('page', page)
  }

  return (
    <>
      <Main>
        <div className={`row row-end theme-${theme}`}>
          <Search onChangeKeyword={setKeywordSearch} />
          <Button handleClick={() => setIsShowModalCreate(true)}>
            Add book
          </Button>
        </div>
        <div className={`store-data row theme-${theme}`}>
          <DataTable
            dataTitle={dataTitle}
            data={dataBooksShow}
            limitPage={5}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleActions={[handleOpenModalUpdate, handleOpenModalDelete]}
          />
        </div>
      </Main>

      {/* Modal Create Book */}
      {isShowModalCreate && (
        <ModalCreate
          handleSubmit={handleCreateBook}
          handleCloseModal={handleCloseModal}
        />
      )}

      {/* Modal Update Book */}
      {isShowModalUpdate && (
        <ModalUpdate
          currentBook={currentBookUpdate}
          handleSubmit={handleUpdateBook}
          handleCloseModal={handleCloseModal}
        />
      )}

      {/* Modal Delete Book */}
      {isShowModalDelete && (
        <ModalDelete
          currentBook={currentBookDelete}
          handleSubmit={handleDeleteBook}
          handleCloseModal={handleCloseModal}
        />
      )}

      {isLoading && <Loading />}
    </>
  )
}

export default Books
