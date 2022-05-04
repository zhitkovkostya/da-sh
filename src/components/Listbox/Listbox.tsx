import React from "react";
import "./listbox.css";

interface ListboxContextOptions {
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<null>>;
}

/**
 * Listbox Context
 */
const ListboxContext = React.createContext<ListboxContextOptions>({
  selectedOption: null,
  setSelectedOption: () => {},
});

interface ListboxOptionProps {
  // The option's content.
  children: React.ReactNode;
  // Whether or not the option is disabled from selection and navigation.
  disabled?: boolean;
  // The option's value.
  value: any;
}

/**
 * Listbox Option
 */
const ListboxOption = ({
  children,
  disabled = false,
  value,
}: ListboxOptionProps) => {
  const context = React.useContext(ListboxContext);
  const isSelected = context.selectedOption === value;

  const handleClick = (event: React.MouseEvent) => {
    context.setSelectedOption(value);
  };

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
      // Each option in the listbox has role `option` and is a DOM descendant of the element with role `listbox`.
      // https://www.w3.org/TR/wai-aria-1.0/roles#option
      id={value}
      role="option"
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

interface ListboxProps {
  children: React.ReactNode;
}

/**
 * Listbox
 */
const Listbox = ({ children, ...props }: ListboxProps) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const context = React.useMemo(
    () => ({ selectedOption, setSelectedOption }),
    [selectedOption]
  );
  return (
    <ListboxContext.Provider value={context}>
      <ul
        aria-activedescendant={String(selectedOption)}
        className="listbox"
        tabIndex={0}
        {...props}
      >
        {children}
      </ul>
    </ListboxContext.Provider>
  );
};

export type { ListboxProps, ListboxOptionProps };

export { Listbox, ListboxOption };
