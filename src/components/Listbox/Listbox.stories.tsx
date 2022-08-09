import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { Listbox, ListboxOption } from './Listbox';
import { ListboxProps } from './types';

const optionsData = [
  { value: 'default', text: 'Choose a state...' },
  { value: 'al', text: 'Alabama' },
  { value: 'ak', text: 'Alaska' },
  { value: 'az', text: 'Arizona' },
  { value: 'ar', text: 'Arkansas' },
  { value: 'ca', text: 'California' },
  { value: 'co', text: 'Colorado' },
  { value: 'ct', text: 'Connecticut' },
  { value: 'de', text: 'Delaware' },
  { value: 'fl', text: 'Florida' },
  { value: 'ga', text: 'Georgia' },
  { value: 'hi', text: 'Hawaii' },
  { value: 'id', text: 'Idaho' },
  { value: 'il', text: 'Illinois' },
  { value: 'in', text: 'Indiana' },
  { value: 'ia', text: 'Iowa' },
  { value: 'ks', text: 'Kansas' },
  { value: 'ky', text: 'Kentucky' },
  { value: 'la', text: 'Louisiana' },
  { value: 'me', text: 'Maine' },
  { value: 'md', text: 'Maryland' },
  { value: 'ma', text: 'Massachusettes' },
  { value: 'mi', text: 'Michigan' },
  { value: 'mn', text: 'Minnesota' },
  { value: 'ms', text: 'Mississippi' },
  { value: 'mo', text: 'Missouri' },
  { value: 'mt', text: 'Montana' },
  { value: 'ne', text: 'Nebraska' },
  { value: 'nv', text: 'Nevada' },
  { value: 'nh', text: 'New Hampshire' },
  { value: 'nj', text: 'New Jersey' },
  { value: 'nm', text: 'New Mexico' },
  { value: 'ny', text: 'New York' },
  { value: 'nc', text: 'North Carolina' },
  { value: 'nd', text: 'North Dakota' },
  { value: 'oh', text: 'Ohio' },
  { value: 'ok', text: 'Oklahoma' },
  { value: 'or', text: 'Oregon' },
  { value: 'pa', text: 'Pennsylvania' },
  { value: 'ri', text: 'Rhode Island' },
  { value: 'sc', text: 'South Carolina' },
  { value: 'sd', text: 'South Dakota' },
  { value: 'tn', text: 'Tennessee' },
  { value: 'tx', text: 'Texas' },
  { value: 'ut', text: 'Utah' },
  { value: 'va', text: 'Vermont' },
  { value: 'wa', text: 'Washington' },
  { value: 'wv', text: 'West Virginia' },
  { value: 'wi', text: 'Wisconsin' },
  { value: 'wy', text: 'Wyoming' },
];
const options = optionsData.map((option) => option.value);
const labels = optionsData.reduce((prev, current) => ({ ...prev, [`${[current.value]}`]: current.text }), {});

export default {
  title: 'Components/Listbox',
  component: Listbox,
  argTypes: {
    defaultValue: {
      options,
      control: {
        type: 'select',
        labels,
      },
    },
  },
} as Meta;

// Create a master template for mapping args to render the Listbox component
const Template: Story<ListboxProps> = (args) => (
  <div style={{ width: 300, height: 200 }}>
    <Listbox {...args}>
      {optionsData.map((option) => (
        <ListboxOption value={option.value} key={option.value}>
          {option.text}
        </ListboxOption>
      ))}
    </Listbox>
  </div>
);

// Reuse that template for creating different stories
export const Basic = Template.bind({});
Basic.args = {
  defaultValue: 'default',
};
