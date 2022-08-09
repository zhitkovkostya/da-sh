import React from 'react'
import { ButtonProps } from './types'
import './styles.css'

// Primary UI component for user interaction
function Button({
  primary = true,
  size = 'medium',
  onClick,
  label
}: ButtonProps) {
  const mode = primary ? 'button--primary' : 'button--secondary'
  const classNames = ['button', `button--${size}`, mode].join(' ')

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
