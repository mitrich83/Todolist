import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todolistID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
}
export type changeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string,
    title: string
}
export type changeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string,
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodoListAT
    | AddTodoListAT
    | changeTodolistTitleAT
    | changeTodoListFilterAT



export const todolistsReducer = (state: TodolistsType[], action: ActionType
):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.todolistID)]
        case 'ADD-TODOLIST':
            const todolistID = v1()
            const newTodolist: TodolistsType = {
                id: todolistID,
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
                    ? {...tl, title: action.filter}
                    : tl
                )

        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistID: string):RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todolistID: todolistID}
}

export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAC = (todolistID:string, title: string):changeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID: todolistID, title:title}
}

export const ChangeTodoListFilterAC = (todolistID:string, filter: FilterValuesType):changeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID: todolistID, filter: filter}
}