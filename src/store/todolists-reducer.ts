import {todolistAPI, TodolistsType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType} from './store';
import {v1} from 'uuid';

export const todolistID1 = v1()
export const todolistID2 = v1()

// types
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export type TodolistsActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistActionType

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            return [{...action.item, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListId
                    ? {...tl, title: action.title}
                    : tl
                )
        case 'CHANGE-TODOLIST-FILTER':
            return state
                .map(tl => tl.id === action.todoListId
                    ? {...tl, filter: action.filter}
                    : tl
                )
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}

export const addTodolistAC = (item: TodolistsType) => {
    return {type: 'ADD-TODOLIST', item} as const
}

export const changeTodolistTitleAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, title} as const
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter} as const
}

export const setTodolistAC = (todolists: TodolistsType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const
}
// Thunks
export const setTodolistThunk = () => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const removeTodolistTC = (todoListId: string)=> {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        todolistAPI.deleteTodo(todoListId)
            .then((res)=> {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.createTodo(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        todolistAPI.updateTodoTitle(todoListId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todoListId, title))
            })
    }
}