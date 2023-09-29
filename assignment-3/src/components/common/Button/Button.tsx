import { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined
  children: ReactNode
  status?: string
  handleClick?: () => void
  handleHover?: () => void
}

const Button = ({
  type = 'button',
  children,
  status,
  handleClick,
  handleHover,
}: ButtonProps) => {
  return (
    <button
      className={`${styles['btn']} ${styles[`${status}`]}`}
      type={type}
      onClick={handleClick}
      onFocus={handleHover}
    >
      {children}
    </button>
  )
}

export default Button
