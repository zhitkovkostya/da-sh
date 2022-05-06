import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Listbox, ListboxOption, ListboxProps } from "./Listbox";

const optionsData = [
  { value: "default", text: "Choose a city" },
  { value: "ny", text: "New York" },
  { value: "nj", text: "New Jersey" },
];
const options = optionsData.map((option) => option.value);
const labels = optionsData.reduce((prev, current) => {
  return { ...prev, [`${[current.value]}`]: current.text };
}, {});

export default {
  title: "Components/Listbox",
  component: Listbox,
  argTypes: {
    defaultValue: {
      options,
      control: {
        type: "select",
        labels,
      },
    },
  },
} as Meta;

// Create a master template for mapping args to render the Listbox component
const Template: Story<ListboxProps> = (args) => (
  <Listbox {...args}>
    {optionsData.map((option) => (
      <ListboxOption value={option.value} key={option.value}>
        {option.text}
      </ListboxOption>
    ))}
  </Listbox>
);

// Reuse that template for creating different stories
export const Basic = Template.bind({});
Basic.args = {
  defaultValue: "default",
};
