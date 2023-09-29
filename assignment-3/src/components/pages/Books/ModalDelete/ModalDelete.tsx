import { useState, useContext } from 'react'
import { ThemeContext } from '../../../../contexts/ThemeContext'
import Modal from '../../../common/Modal/Modal'
import Button from '../../../common/Button/Button'
import { Book } from '../../../../types/CommonTypes'
import styles from './ModalDelete.module.css'

interface ModalDeleteProps {
  currentBook: Book
  handleSubmit: (book) => void
  handleCloseModal: () => void
}

const ModalDelete = ({
  currentBook,
  handleSubmit,
  handleCloseModal,
}: ModalDeleteProps) => {
  const [isSelectConfirm, setIsSelectConfirm] = useState(false)
  const theme = useContext(ThemeContext)

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
            status={!isSelectConfirm ? 'option' : 'selected'}
            handleClick={() => handleSubmit(currentBook)}
            handleHover={() => {
              if (!isSelectConfirm) {
                setIsSelectConfirm(!isSelectConfirm)
              }
            }}
          >
            Delete
          </Button>
          <Button
            status={isSelectConfirm ? 'option' : 'selected'}
            handleClick={handleCloseModal}
            handleHover={() => {
              if (isSelectConfirm) {
                setIsSelectConfirm(!isSelectConfirm)
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDelete
