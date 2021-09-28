import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

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


export type TasksStateType = { [key: string]: Array<TaskType> }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.id
                        ? {...t, ...action.domainModel}
                        : t
                    )
            }
        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.item.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        default:
            return state
    }
}

// actions
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListId, tasks} as const
}
export const removeTaskAC = (todoListId: string, id: string) => {
    return {type: 'REMOVE-TASK', todoListId, id} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todoListId, id, domainModel} as const
}


// Thunks

export const setTaskTC = (todoListId: string) => (dispatch: Dispatch<TasksActionsTypes>) => {
    tasksAPI.getTask(todoListId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(todoListId, tasks))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) =>
    (dispatch: Dispatch<TasksActionsTypes>) => {
        tasksAPI.removeTask(todoListId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todoListId, taskId))
            })
    }

export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<TasksActionsTypes>) => {
        tasksAPI.addTask(todolistId, title)
            .then((res) => {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }

export const updateTaskTC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<TasksActionsTypes>, getState: () => AppRootStateType) => {
    const state = getState();
    let task = state.tasks[todoListId].find(task => task.id === id)
    debugger
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
    tasksAPI.updateTask(todoListId, id, apiModel)
        .then((res) => {
            dispatch(updateTaskAC(todoListId, id, domainModel))
        })
}



