import React from 'react'
import {
  HighlightDirection,
  ListboxDescendant,
  ListboxContextOptions,
  ListboxOptionProps,
  ListboxProps,
  ListboxValue
} from './types'
import './styles.css'

/**
 * Listbox Context
 */
const ListboxContext = React.createContext<ListboxContextOptions>({
  options: [],
  setOptions: () => {},
  focusedOption: undefined,
  setFocusedOption: () => {},
  selectedOption: undefined,
  setSelectedOption: () => {}
})

ListboxContext.displayName = 'ListboxContext'

/**
 * Listbox Option
 */
function ListboxOption({
  children,
  disabled = false,
  value
}: ListboxOptionProps) {
  const ref = React.useRef<HTMLLIElement>(null)
  const { focusedOption, setFocusedOption, selectedOption, setSelectedOption } =
    React.useContext(ListboxContext)
  const isFocused = focusedOption === value
  const isSelected = selectedOption === value

  const handleClick = () => {
    setSelectedOption(value)
  }

  React.useEffect(() => {
    if (isSelected === true) {
      setFocusedOption(value)
    }
  }, [selectedOption])

  React.useLayoutEffect(() => {
    if (ref.current === null || isFocused === false) {
      return
    }

    ref.current.scrollIntoView({ block: 'nearest' })
  }, [focusedOption])

  return (
    <li
      // Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
      // https://www.w3.org/TR/wai-aria/#aria-disabled
      aria-disabled={disabled}
      // In a single-select listbox, the selected option has `aria-selected`
      // set to `true`.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      aria-selected={isSelected}
      className="listbox-option"
      data-focused={isFocused}
      // Each option in the listbox has role `option` and is a DOM descendant of the element with role `listbox`.
      // https://www.w3.org/TR/wai-aria-1.0/roles#option
      id={String(value)}
      ref={ref}
      role="option"
      // Safari keeps the option focused when clicked.
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </li>
  )
}

/**
 * Listbox
 */
function Listbox({ children, defaultValue, ...props }: ListboxProps) {
  const listboxRef = React.useRef<HTMLUListElement>(null)

  const [options, setOptions] = React.useState<ListboxDescendant[]>([])

  const [focusedOption, setFocusedOption] =
    React.useState<ListboxValue>(defaultValue)

  const [selectedOption, setSelectedOption] =
    React.useState<ListboxValue>(defaultValue)

  const tabIndex = options.length > 0 ? 0 : -1

  const context = React.useMemo<ListboxContextOptions>(
    () => ({
      options,
      setOptions,
      focusedOption,
      setFocusedOption,
      selectedOption,
      setSelectedOption
    }),
    [options, focusedOption, selectedOption]
  )

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault()
        highlightSiblingOption(HighlightDirection.Down)
        break
      case 'ArrowUp':
        event.preventDefault()
        highlightSiblingOption(HighlightDirection.Up)
        break
      case 'Enter':
      case 'Space':
        event.preventDefault()
        setSelectedOption(focusedOption)
        break
    }
  }

  const highlightSiblingOption = (direction: HighlightDirection) => {
    const optionData = options.find((option) => option.value === focusedOption)
    const optionIndex = optionData ? optionData.index : 0

    let nextIndex = optionIndex

    if (direction === HighlightDirection.Down) {
      nextIndex = optionIndex + 1
    } else {
      nextIndex = optionIndex - 1
    }

    if (
      options[nextIndex] === undefined ||
      options[nextIndex].value === focusedOption
    ) {
      return
    }

    const nextValue = options[nextIndex].value
    setFocusedOption(nextValue)
  }

  const handleFocus = () => {
    if (typeof focusedOption === 'undefined' && options.length > 0) {
      setFocusedOption(options[0].value)
    }
  }

  React.useEffect(() => {
    setSelectedOption(defaultValue)
  }, [defaultValue])

  React.useLayoutEffect(() => {
    const optionsData =
      React.Children.map<
        ListboxDescendant,
        React.ReactElement<ListboxOptionProps>
      >(children, (child, index) => ({
        index,
        value: child.props.value
      })) || []

    setOptions(optionsData)
  }, [])

  return (
    <ListboxContext.Provider value={context}>
      <ul
        aria-activedescendant={String(focusedOption)}
        className="listbox"
        ref={listboxRef}
        role="listbox"
        tabIndex={tabIndex}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </ul>
    </ListboxContext.Provider>
  )
}

export type { ListboxProps, ListboxOptionProps }

export { Listbox, ListboxOption }
