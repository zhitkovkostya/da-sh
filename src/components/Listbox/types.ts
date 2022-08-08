export type ListboxValue = string | undefined;

export enum HighlightDirection {
  Up,
  Down,
}

export interface ListboxProps {
  children:
      | React.ReactElement<ListboxOptionProps>
      | React.ReactElement<ListboxOptionProps>[];
  defaultValue?: ListboxValue;
}

export interface ListboxOptionProps {
  // The option's content.
  children: React.ReactNode;
  // Whether or not the option is disabled from selection and navigation.
  disabled?: boolean;
  // The option's value.
  value: ListboxValue;
}

export interface ListboxDescendant {
  // Option index.
  index: number;
  // Option value.
  value: ListboxValue;
}

export interface ListboxContextOptions {
  // A set of listbox option data.
  options: ListboxDescendant[];
  setOptions: React.Dispatch<React.SetStateAction<ListboxDescendant[]>>;
  // Focused option id.
  focusedOption: ListboxValue;
  setFocusedOption: React.Dispatch<React.SetStateAction<ListboxValue>>;
  // Selected option id.
  selectedOption: ListboxValue;
  setSelectedOption: React.Dispatch<React.SetStateAction<ListboxValue>>;
}