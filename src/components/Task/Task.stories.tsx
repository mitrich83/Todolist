import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {v1} from 'uuid';
import {todolistID1} from '../../store/todolists-reducer';

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
        id: v1(),
        title: 'HTML',
        status: TaskStatuses.Completed,
        completed: true,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        todoListId: todolistID1,
        deadline: ''

    }
};
export const TaskIsNoteDoneStory = TaskTemplate.bind({});
TaskIsNoteDoneStory.args = {
    todolistID: 'todo 1',
    task: {
        id: v1(),
        title: 'HTML',
        status: TaskStatuses.New,
        completed: true,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        todoListId: todolistID1,
        deadline: ''
    }
};
