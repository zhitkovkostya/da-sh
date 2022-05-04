import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Listbox, ListboxOption, ListboxProps } from "./Listbox";

export default {
  title: "Components/Listbox",
  component: Listbox,
} as Meta;

// Create a master template for mapping args to render the Listbox component
const Template: Story<ListboxProps> = (args) => (
  <>
    <Listbox {...args}>
      <ListboxOption value={"default"}>Choose a city</ListboxOption>
      <ListboxOption value={"ny"}>New York</ListboxOption>
      <ListboxOption value={"nj"}>New Jersey</ListboxOption>
    </Listbox>
  </>
);

// Reuse that template for creating different stories
export const Basic = Template.bind({});
Basic.args = {};
