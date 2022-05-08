import React, { ReactChild } from "react";
import "./listbox.css";

type ListboxValue = string | undefined;

enum HighlightDirection {
  Up,
  Down,
}

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
  selectedOption: undefined,
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
      // Safari keeps the option focused when clicked.
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

interface ListboxProps {
  children: React.ReactElement<ListboxOptionProps>[];
  defaultValue?: ListboxValue;
}

/**
 * Listbox
 */
const Listbox = ({ children, defaultValue, ...props }: ListboxProps) => {
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const [options, setOptions] = React.useState<ListboxDescendant[]>([]);

  const [selectedOption, setSelectedOption] =
    React.useState<ListboxValue>(defaultValue);

  const tabIndex = options.length > 0 ? 0 : -1;

  const context = React.useMemo<ListboxContextOptions>(
    () => ({ options, setOptions, selectedOption, setSelectedOption }),
    [options, selectedOption]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case "ArrowDown":
        event.preventDefault();
        highlightSiblingOption(HighlightDirection.Down);
        break;
      case "ArrowUp":
        event.preventDefault();
        highlightSiblingOption(HighlightDirection.Up);
        break;
    }
  };

  const highlightSiblingOption = (direction: HighlightDirection) => {
    const optionData = options.find(
      (option) => option.value === selectedOption
    );
    const optionIndex = optionData ? optionData.index : 0;

    let nextIndex = optionIndex;
    let nextValue;

    if (direction === HighlightDirection.Down) {
      nextIndex = optionIndex + 1;
    } else {
      nextIndex = optionIndex - 1;
    }

    if (
      options[nextIndex] === undefined ||
      options[nextIndex].value === selectedOption
    ) {
      return;
    }

    nextValue = options[nextIndex].value;
    setSelectedOption(nextValue);
  };

  const handleFocus = () => {
    if (typeof selectedOption === "undefined" && options.length > 0) {
      setSelectedOption(options[0].value);
    }
  };

  const getOptionElementByValue = (
    value: ListboxValue
  ): HTMLLIElement | undefined => {
    const listboxEl = listboxRef.current;

    if (listboxEl === null) {
      return;
    }

    const listboxOptionEl = listboxEl.querySelector<HTMLLIElement>(
      `#${selectedOption}`
    );

    if (listboxOptionEl === null) {
      return;
    }

    return listboxOptionEl;
  };

  React.useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  React.useLayoutEffect(() => {
    const listboxOptionEl = getOptionElementByValue(selectedOption);

    if (listboxOptionEl === undefined) {
      return;
    }

    listboxOptionEl.scrollIntoView({ block: "nearest" });
  }, [selectedOption]);

  React.useLayoutEffect(() => {
    const optionsData =
      React.Children.map<
        ListboxDescendant,
        React.ReactElement<ListboxOptionProps>
      >(children, (child, index) => {
        return { index: index, value: child.props.value };
      }) || [];

    setOptions(optionsData);
  }, []);

  return (
    <ListboxContext.Provider value={context}>
      <ul
        aria-activedescendant={String(selectedOption)}
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
  );
};

export type { ListboxProps, ListboxOptionProps };

export { Listbox, ListboxOption };
