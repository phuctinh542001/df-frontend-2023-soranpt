import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import SwitchTheme from '../../components/common/SwitchTheme/SwitchTheme'
import Account from '../../components/common/Account/Account'
import './Header.css'

const Header = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <header id="header" className={`theme-${theme}`}>
      <div className="header__logo">
        <a href="/">Bookstore</a>
      </div>
      <div className="header__actions">
        <SwitchTheme />
        <Account />
      </div>
    </header>
  )
}

export default Header
