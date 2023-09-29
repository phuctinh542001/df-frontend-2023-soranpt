import { useContext, ReactNode } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import styles from './Modal.module.css'

interface ModalProps {
  title: string
  children: ReactNode
  handleCloseModal: () => void
}

const Modal = ({ title, children, handleCloseModal }: ModalProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`${styles['modal-container']}  ${styles[`theme-${theme}`]}`}
      onClick={handleCloseModal}
      onKeyDown={handleCloseModal}
      role="button"
      tabIndex={0}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        <div className={styles['modal-header']}>
          <div className={styles['header-title']}>
            <span>{title}</span>
          </div>
          <button className={styles['header-btn']} onClick={handleCloseModal}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
