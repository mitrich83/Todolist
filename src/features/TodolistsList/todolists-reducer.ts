import {todolistAPI, TodolistsType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {
    RequestStatusType,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {ResponseEnum} from './tasks-reducer';

export const todolistID1 = v1()
export const todolistID2 = v1()


const initialState: TodolistDomainType[] = []

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListId)
        case 'TODOLIST/ADD-TODOLIST':
            return [{...action.item, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'TODOLIST/CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListId
                    ? {...tl, title: action.title}
                    : tl
                )
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state
                .map(tl => tl.id === action.todoListId
                    ? {...tl, filter: action.filter}
                    : tl
                )
        case 'TODOLIST/SET-TODOLIST': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todoListId ? ({...tl, entityStatus: action.entityStatus}) : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (todoListId: string) =>
    ({type: 'TODOLIST/REMOVE-TODOLIST', todoListId}) as const

export const addTodolistAC = (item: TodolistsType) =>
    ({type: 'TODOLIST/ADD-TODOLIST', item}) as const

export const changeTodolistTitleAC = (todoListId: string, title: string) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-TITLE', todoListId, title}) as const

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-FILTER', todoListId, filter}) as const

export const setTodolistAC = (todolists: TodolistsType[]) =>
    ({type: 'TODOLIST/SET-TODOLIST', todolists}) as const

export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => ({
    type: 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS',
    todoListId,
    entityStatus
} as const)


// Thunks
export const setTodolistThunk = () => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}
export const removeTodolistTC = (todoListId: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListId,'loading'))
        todolistAPI.deleteTodo(todoListId)
            .then((res) => {
                dispatch(removeTodolistAC(todoListId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todoListId,'succeeded'))
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodo(title)
            .then((res) => {
                if (res.data.resultCode === ResponseEnum.success) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TodolistsType }>(dispatch, res.data)
                }
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const changeTodolistTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodoTitle(todoListId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todoListId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError)=> {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

// types
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;


export type TodolistsActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistActionType
    | SetAppStatusACType
    | SetAppErrorACType
    | ChangeTodolistEntityStatusACType

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
