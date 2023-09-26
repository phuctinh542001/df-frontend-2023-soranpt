import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';

import styles from './ModalCreate.module.css';

const ModalCreate = ({ handleSubmit, handleCloseModal }) => {
  const [newBook, setNewBook] = useState({});
  const theme = useContext(ThemeContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  return (
    <Modal title="Add New Book" handleCloseModal={handleCloseModal}>
      <div className={`${styles['modal-content']} ${styles[`theme-${theme}`]}`}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(newBook);
          }}
        >
          <label htmlFor="input__name">Name</label>
          <input
            id="input__name"
            type="text"
            name="name"
            placeholder="Enter book's name ..."
            autoComplete="on"
            value={newBook.name || ''}
            onChange={handleChange}
          />
          <label htmlFor="input__author">Author</label>
          <input
            id="input__author"
            type="text"
            name="author"
            placeholder="Enter book's author ..."
            autoComplete="on"
            value={newBook.author || ''}
            onChange={handleChange}
          />
          <label htmlFor="input__topic">Topic</label>
          <select
            id="input__topic"
            name="topic"
            value={newBook.topic || ''}
            onChange={handleChange}
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
          </select>
          <div className={`${styles['modal-actions']}`}>
            <Button type="submit" title="Create"></Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreate;
