import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: TasksStateType = {}

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'TASK/SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        case 'TASK/REMOVE-TASK': {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)}
        }
        case 'TASK/ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'TASK/UPDATE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.id
                        ? {...t, ...action.domainModel}
                        : t
                    )
            }
        case 'TODOLIST/SET-TODOLIST': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'TODOLIST/ADD-TODOLIST': {
            return {...state, [action.item.id]: []}
        }
        case 'TODOLIST/REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        default:
            return state
    }
}

// actions
export const setTaskAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: 'TASK/SET-TASKS', todoListId, tasks}) as const

export const removeTaskAC = (todoListId: string, id: string) =>
    ({type: 'TASK/REMOVE-TASK', todoListId, id}) as const

export const addTaskAC = (task: TaskType) =>
    ({type: 'TASK/ADD-TASK', task}) as const

export const updateTaskAC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => ({
    type: 'TASK/UPDATE-TASK',
    todoListId,
    id,
    domainModel
}) as const


// Thunks

export const setTaskTC = (todoListId: string) => (dispatch: Dispatch<TasksActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTask(todoListId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(todoListId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError)=> {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) =>
    (dispatch: Dispatch<TasksActionsTypes>) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.removeTask(todoListId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todoListId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<TasksActionsTypes>) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.addTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResponseEnum.success) {
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                        handleServerAppError<{ item: TaskType }>(dispatch, res.data)
                    }
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const updateTaskTC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<TasksActionsTypes>, getState: () => AppRootStateType) => {
    const state = getState();
    let task = state.tasks[todoListId].find(task => task.id === id)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        completed: task.completed,
        ...domainModel
    }
    dispatch(setAppStatusAC('loading'))
    tasksAPI.updateTask(todoListId, id, apiModel)
        .then((res) => {
            dispatch(updateTaskAC(todoListId, id, domainModel))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError)=> {
            handleServerNetworkError(dispatch, err.message)
        })
}

//types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTaskACType = ReturnType<typeof setTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>

export type TasksActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
    | SetTaskACType
    | UpdateTaskACType
    | SetAppStatusACType
    | SetAppErrorACType

export type TasksStateType = { [key: string]: Array<TaskType> }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export enum ResponseEnum {
    'success' = 0,
    'error'= 1,
    'captcha' = 10
}



