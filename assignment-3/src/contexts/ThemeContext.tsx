import { useState, useMemo, createContext } from 'react'
import { ThemeContextType } from '../types/ContextTypes'

export const ThemeContext = createContext<ThemeContextType>({
  theme: '',
  setTheme: () => {},
})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
