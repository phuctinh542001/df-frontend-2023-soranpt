import Main from "./layouts/Main/Main";
import Search from "./components/Search/Search";
import Button from "./components/Button/Button";
import DataTable from "./components/DataTable/DataTable";
import Modal from "./components/Modal/Modal";
import initialDataBooks from "./data/book-store";
import { ThemeContext } from "./contexts/ThemeContext";
import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";

function App() {
  const [theme, setTheme] = useState("");
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isHoverDelete, setIsHoverDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const dataTitle = ["Serial", "Name", "Author", "Topic", "Action"];
  const [dataBooks, setDataBooks] = useState([]);
  const [dataBooksShow, setDataBooksShow] = useState([]);

  const [newBook, setNewBook] = useState({});
  const [currentBookUpdate, setCurrentBookUpdate] = useState({});
  const [currentBookDelete, setCurrentBookDelete] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setUp = async () => {
      setIsLoading(true);
      const localTheme = localStorage.getItem("theme-store");
      const localPage = Number(localStorage.getItem("page-store"));
      const localDataBooks = JSON.parse(localStorage.getItem("book-store"));

      if (!localTheme) {
        setTheme("light");
        localStorage.setItem("theme-store", "light");
      } else {
        setTheme(localTheme);
      }

      if (!localPage) {
        setCurrentPage(1);
        localStorage.setItem("page-store", "1");
      } else {
        setCurrentPage(localPage);
      }

      if (!localDataBooks) {
        setDataBooks([...initialDataBooks]);
        setDataBooksShow([...initialDataBooks]);
        localStorage.setItem(
          "book-store",
          JSON.stringify([...initialDataBooks])
        );
      } else {
        setDataBooks(localDataBooks);
        setDataBooksShow(localDataBooks);
      }
      await new Promise((r) => setTimeout(r, 800));
      setIsLoading(false);
    };

    setUp();
  }, []);

  const handleToggleCreateModal = () => {
    if (!isShowModalCreate) {
      console.log("Open Modal Create Book");
      setNewBook({
        name: "",
        author: "",
        topic: "",
      });
    }
    setIsShowModalCreate(!isShowModalCreate);
  };

  const handleToggleUpdateModal = (id) => {
    if (!isShowModalUpdate) {
      console.log("Open Modal Update Book");
      const currentBook = dataBooks.find((item) => item.id === id);
      if (currentBook) {
        setCurrentBookUpdate(currentBook);
      } else {
        setCurrentBookUpdate({
          name: "",
          author: "",
          topic: "",
        });
      }
    }
    setIsShowModalUpdate(!isShowModalUpdate);
  };

  const handleToggleDeleteModal = (id) => {
    if (!isShowModalDelete) {
      console.log("Open Modal Delete Book");
      const currentBook = dataBooks.find((item) => item.id === id);
      if (currentBook) {
        setCurrentBookDelete(currentBook);
      } else {
        setCurrentBookDelete({
          name: "",
          author: "",
          topic: "",
        });
      }
    }
    setIsShowModalDelete(!isShowModalDelete);
  };

  const handleCreateBook = (book) => {
    const newDataBook = [
      ...dataBooks,
      {
        id: dataBooks.slice(-1)[0].id + 1,
        ...book,
      },
    ];

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book-store", JSON.stringify(newDataBook));

    handleToggleCreateModal();
  };

  const handleUpdateBook = (book) => {
    const newDataBook = dataBooks.map((item) => {
      if (item.id === book.id) {
        return book;
      }
      return item;
    });

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book-store", JSON.stringify(newDataBook));

    handleToggleUpdateModal();
  };

  const handleDeleteBook = (book) => {
    const newDataBook = dataBooks.filter((item) => {
      return item.id !== book.id;
    });

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book-store", JSON.stringify(newDataBook));

    handleToggleDeleteModal();
  };

  const handleSearch = (keyword) => {
    keyword = keyword.toLowerCase();
    const newDataBook = dataBooks.filter((book) => {
      return book.name.toLowerCase().includes(keyword);
    });

    setDataBooksShow(newDataBook);
    setCurrentPage(1);
    localStorage.setItem("page-store", "1");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Main>
        <div className={`store-actions row row-end theme-${theme}`}>
          <Search onChangeKeyword={handleSearch} />
          <Button title="Add book" handleClick={handleToggleCreateModal} />
        </div>
        <div className={`store-data row theme-${theme}`}>
          <DataTable
            currentPage={currentPage}
            dataTitle={dataTitle}
            data={dataBooksShow}
            handleActions={[
              setCurrentPage,
              handleToggleUpdateModal,
              handleToggleDeleteModal,
            ]}
          />
        </div>
      </Main>

      {/* Modal Create Book */}
      {isShowModalCreate && (
        <Modal title="Add Book" handleToggleModal={handleToggleCreateModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="input__name">Name</label>
              <input
                id="input__name"
                type="text"
                name="name"
                placeholder="Enter book's name ..."
                autoComplete="on"
                value={newBook.name}
                onChange={(event) =>
                  setNewBook({ ...newBook, name: event.target.value })
                }
              />
              <label htmlFor="input__author">Author</label>
              <input
                id="input__author"
                type="text"
                name="author"
                placeholder="Enter book's author ..."
                autoComplete="on"
                value={newBook.author}
                onChange={(event) =>
                  setNewBook({ ...newBook, author: event.target.value })
                }
              />
              <label htmlFor="input__topic">Topic</label>
              <select
                id="input__topic"
                name="topic"
                value={newBook.topic}
                onChange={(event) =>
                  setNewBook({ ...newBook, topic: event.target.value })
                }
              >
                <option value="" disabled hidden>
                  Select book's topic
                </option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Big Data">Big Data</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <div className="footer__action">
              <Button
                title="Create"
                handleClick={() => handleCreateBook(newBook)}
              ></Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Update Book */}
      {isShowModalUpdate && (
        <Modal title="Update Book" handleToggleModal={handleToggleUpdateModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="input__name">Name</label>
              <input
                id="input__name"
                type="text"
                name="name"
                placeholder="Enter book's name ..."
                autoComplete="on"
                value={currentBookUpdate.name}
                onChange={(event) =>
                  setCurrentBookUpdate({
                    ...currentBookUpdate,
                    name: event.target.value,
                  })
                }
              />
              <label htmlFor="input__author">Author</label>
              <input
                id="input__author"
                type="text"
                name="author"
                placeholder="Enter book's author ..."
                autoComplete="on"
                value={currentBookUpdate.author}
                onChange={(event) =>
                  setCurrentBookUpdate({
                    ...currentBookUpdate,
                    author: event.target.value,
                  })
                }
              />
              <label htmlFor="input__topic">Topic</label>
              <select
                id="input__topic"
                name="topic"
                value={currentBookUpdate.topic}
                onChange={(event) =>
                  setCurrentBookUpdate({
                    ...currentBookUpdate,
                    topic: event.target.value,
                  })
                }
              >
                <option value="" disabled hidden>
                  Select book's topic
                </option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Big Data">Big Data</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <div className="footer__action">
              <Button
                title="Update"
                handleClick={() => handleUpdateBook(currentBookUpdate)}
              ></Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Delete Book */}
      {isShowModalDelete && (
        <Modal title="Delete Book" handleToggleModal={handleToggleDeleteModal}>
          <div className={`modal-content content-center  theme-${theme}`}>
            <span>Do you want to delete the book named</span>
            <br />
            <span>
              <b>{currentBookDelete.name}</b> ?
            </span>
          </div>
          <div className="modal-footer">
            <div className="footer__action footer-around">
              <Button
                option={true}
                selected={isHoverDelete}
                title="Delete"
                handleClick={() => handleDeleteBook(currentBookDelete)}
                handleHover={() => {
                  setIsHoverDelete(!isHoverDelete);
                }}
              >
                Delete
              </Button>
              <Button
                option={true}
                selected={!isHoverDelete}
                title="Cancel"
                handleClick={handleToggleDeleteModal}
                handleHover={() => {
                  setIsHoverDelete(!isHoverDelete);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isLoading && <Loading />}
    </ThemeContext.Provider>
  );
}

export default App;
