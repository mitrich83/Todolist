import React from 'react';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistID1, todolistID2, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

import {Provider} from 'react-redux';
import {appReducer} from '../app/app-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

const initialGlobalState = {
    todolists: [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {      id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''},
            {
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
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID2,
                deadline: ''
            },
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID2,
                deadline: ''
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer);

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)