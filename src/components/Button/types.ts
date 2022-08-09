import { MouseEvent } from 'react'

export interface ButtonProps {
  // Is this the principal call to action on the page?
  primary?: boolean
  // How large should the button be?
  size?: 'medium' | 'large'
  // Button contents
  label: string
  // Optional click handler
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
