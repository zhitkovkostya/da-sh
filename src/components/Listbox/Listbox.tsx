import React, { ReactChild } from "react";
import "./listbox.css";

type ListboxValue = string | null;

interface ListboxDescendant {
  // Option index.
  index: number;
  // Option value.
  value: ListboxValue;
}

interface ListboxContextOptions {
  // A set of listbox option data.
  options: ListboxDescendant[];
  setOptions: React.Dispatch<React.SetStateAction<ListboxDescendant[]>>;
  // Selected option id.
  selectedOption: ListboxValue;
  setSelectedOption: React.Dispatch<React.SetStateAction<ListboxValue>>;
}

/**
 * Listbox Context
 */
const ListboxContext = React.createContext<ListboxContextOptions>({
  options: [],
  setOptions: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
});

ListboxContext.displayName = "ListboxContext";

interface ListboxOptionProps {
  // The option's content.
  children: React.ReactNode;
  // Whether or not the option is disabled from selection and navigation.
  disabled?: boolean;
  // The option's value.
  value: ListboxValue;
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
      id={String(value)}
      role="option"
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

interface ListboxProps {
  children: React.ReactElement<ListboxOptionProps>;
}

/**
 * Listbox
 */
const Listbox = ({ children, ...props }: ListboxProps) => {
  const [options, setOptions] = React.useState<ListboxDescendant[]>([]);

  const [selectedOption, setSelectedOption] =
    React.useState<ListboxValue>(null);

  const context = React.useMemo<ListboxContextOptions>(
    () => ({ options, setOptions, selectedOption, setSelectedOption }),
    [options, selectedOption]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { code } = event;
    const optionData = options.find(
      (option) => option.value === selectedOption
    );
    const optionIndex = optionData ? optionData.index : 0;
    let nextIndex = optionIndex;
    let nextValue;

    if (code === "ArrowUp") {
      nextIndex = optionIndex - 1;
    } else if (code === "ArrowDown") {
      nextIndex = optionIndex + 1;
    } else {
      return false;
    }

    if (
      options[nextIndex] === undefined ||
      options[nextIndex].value === selectedOption
    ) {
      return false;
    }

    nextValue = options[nextIndex].value;
    setSelectedOption(nextValue);
  };

  React.useEffect(() => {
    const optionsData = React.Children.map<
      ListboxDescendant,
      React.ReactElement<ListboxOptionProps>
    >(children, (child, index) => {
      return { index: index, value: child.props.value };
    });

    setOptions(optionsData);
  }, []);

  return (
    <ListboxContext.Provider value={context}>
      <ul
        aria-activedescendant={String(selectedOption)}
        className="listbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </ul>
    </ListboxContext.Provider>
  );
};

export type { ListboxProps, ListboxOptionProps };

export { Listbox, ListboxOption };
