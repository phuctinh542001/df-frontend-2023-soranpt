import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import styles from './Account.module.css'

const Account = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`${styles['container']} ${styles[`theme-${theme}`]}`}>
      <div className={`${styles['avatar']}`}>
        <i className="fa-regular fa-circle-user" />
      </div>
      <div className={`${styles['name']}`}>
        <span>SoraNPT</span>
      </div>
    </div>
  )
}

export default Account
