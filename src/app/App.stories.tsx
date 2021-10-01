import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';


export default {
  title: 'App Stories',
  component: App,
decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const AppTemplate: ComponentStory<typeof App> = (args) => <App />;

export const AppStory = AppTemplate.bind({});
AppStory.args = {

};
