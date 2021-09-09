import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

const removeTaskCallback = action('removeTask clicked')
const changeTaskStatusCallback = action('changeTaskStatus clicked')
const changeTaskTitleCallback = action('changeTaskTitle clicked')

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action('removeTask clicked'),
        changeTaskStatus: action('changeTaskStatus clicked'),
        changeTaskTitle: action('changeTaskTitle clicked'),
    },
} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
    todolistID: 'todo 1',
    task: {
        id: '1',
        title: 'JS',
        isDone: true
    }
};
export const TaskIsNoteDoneStory = TaskTemplate.bind({});
TaskIsNoteDoneStory.args = {
    todolistID: 'todo 1',
    task: {
        id: '1',
        title: 'JS',
        isDone: false
    }
};
