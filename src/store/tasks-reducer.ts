import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    id: string
    status: TaskStatuses
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    id: string
    title: string
}

type ActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, id, status}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, id, title}
}

const initialState: TasksStateType  = {}

export const tasksReducer = (state: TasksStateType = initialState , action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId]
                .filter(t => t.id !== action.id)
            return stateCopy
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
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
                todoListId: action.todolistId
            }
            return {
                ...state,
                [action.todolistId]: [
                    newTask, ...state[action.todolistId]
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            console.log("c")
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, status: action.status} : t
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, title: action.title} : t
                )
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.todolistID]
            return newState
        }
        default:
            return state
    }
}