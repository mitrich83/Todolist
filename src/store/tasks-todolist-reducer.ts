
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {TasksStateType} from './tasks-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    id: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    id: string
    title: string
}

type ActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todoListId: todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoListId: todoListId, title}
}

export const changeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId: todoListId, id, status}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string):ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId: todolistId, id, title}
}
export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId]
                .filter(t => t.id !== action.id)
            return stateCopy
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                deadline: '',
                todoListId: action.todoListId
            }
            return {
                ...state,
                [action.todoListId]: [
                    newTask, ...state[action.todoListId]
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.id
                    ? {...t, status: action.status} : t
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t=> t.id === action.id
                ? {...t, title: action.title} : t
                )
            }
        }
    }
    return state
}