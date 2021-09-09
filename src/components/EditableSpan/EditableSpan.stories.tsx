import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    title: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    },
    changeTitle: {
      description: 'Value EditableSpan changed'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = EditableSpanTemplate.bind({});
EditableSpanStory.args = {
  changeTitle: action('Value EditableSpan changed')
};

