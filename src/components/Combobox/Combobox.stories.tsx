import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Combobox, ComboboxProps } from "./Combobox";

export default {
  title: "Components/Combobox",
  component: Combobox,
} as Meta;

// Create a master template for mapping args to render the Combobox component
const Template: Story<ComboboxProps> = (args) => <Combobox {...args} />;

// Reuse that template for creating different stories
export const Basic = Template.bind({});
Basic.args = {};
