import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    todolistId: string
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string,
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string,
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType



export const todolistsReducer = (state: TodolistsType[], action: ActionType
):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.todolistID)]
        case 'ADD-TODOLIST':
            const newTodolist: TodolistsType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todolistID
                    ? {...tl, title: action.title}
                    : tl
                )
        case 'CHANGE-TODOLIST-FILTER':
            return state
                .map(tl => tl.id === action.todolistID
                    ? {...tl, filter: action.filter}
                    : tl
                )

        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string):RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistID: todolistID}
}

export const addTodolistAC = (title: string):AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title,  todolistId:v1()}
}

export const changeTodolistTitleAC = (todolistID:string, title: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID: todolistID, title:title}
}

export const changeTodoListFilterAC = (todolistID:string, filter: FilterValuesType):ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID: todolistID, filter: filter}
}