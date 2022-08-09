import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'

export type ListboxValue = string | undefined

export enum HighlightDirection {
  Up,
  Down
}

export interface ListboxOptionProps {
  // The option's content.
  children: ReactNode
  // Whether or not the option is disabled from selection and navigation.
  disabled?: boolean
  // The option's value.
  value: ListboxValue
}

export interface ListboxProps {
  children:
    | ReactElement<ListboxOptionProps>
    | ReactElement<ListboxOptionProps>[]
  defaultValue?: ListboxValue
}

export interface ListboxDescendant {
  // Option index.
  index: number
  // Option value.
  value: ListboxValue
}

export interface ListboxContextOptions {
  // A set of listbox option data.
  options: ListboxDescendant[]
  setOptions: Dispatch<SetStateAction<ListboxDescendant[]>>
  // Focused option id.
  focusedOption: ListboxValue
  setFocusedOption: Dispatch<SetStateAction<ListboxValue>>
  // Selected option id.
  selectedOption: ListboxValue
  setSelectedOption: Dispatch<SetStateAction<ListboxValue>>
}
