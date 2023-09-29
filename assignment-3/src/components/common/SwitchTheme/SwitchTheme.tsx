// import { useState } from "react";
import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import { setToLocalStorage } from '../../../utils/localStorage'

import styles from './SwitchTheme.module.css'

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleSwitchTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setToLocalStorage('theme', 'dark')
    } else {
      setTheme('light')
      setToLocalStorage('theme', 'light')
    }
  }

  return (
    <div className={`${styles['container']}`}>
      <button className={`${styles['switch']}`} onClick={handleSwitchTheme}>
        {theme === 'dark' && <i className="fa-solid fa-toggle-off" />}
        {!(theme === 'dark') && <i className="fa-solid fa-toggle-on" />}
      </button>
      <span>{theme === 'light' ? 'Light' : 'Dark'} Mode</span>
    </div>
  )
}

export default SwitchTheme
