import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';

import styles from './ModalDelete.module.css';

const ModalDelete = ({ currentBook, handleSubmit, handleCloseModal }) => {
  const [isSelectConfirm, setIsSelectConfirm] = useState(false)
  const theme = useContext(ThemeContext);

  return (
    <Modal title="Confirm Delete Book" handleCloseModal={handleCloseModal}>
      <div className={`${styles['modal-content']} ${styles[`theme-${theme}`]}`}>
        <div className={`${styles['modal-message']}`}>
          <span>Do you want to delete the book named</span>
          <br />
          <span>
            <b>{currentBook.name}</b> ?
          </span>
        </div>
        <div className={`${styles['modal-actions']}`}>
          <Button
            title="Delete"
            status={!isSelectConfirm ? 'option' : 'selected'}
            handleClick={() => handleSubmit(currentBook)}
            handleHover={() => {
              if (!isSelectConfirm) {
                setIsSelectConfirm(!isSelectConfirm);
              }
            }}
          >
            Delete
          </Button>
          <Button
            title="Cancel"
            status={isSelectConfirm ? 'option' : 'selected'}
            handleClick={handleCloseModal}
            handleHover={() => {
              if (isSelectConfirm) {
                setIsSelectConfirm(!isSelectConfirm);
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
