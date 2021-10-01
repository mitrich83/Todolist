import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionsTypes, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import thunk from 'redux-thunk';
import {appReducer, AppReducerActionsType} from './app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// all actions Type for all App
export type AppActionsType = TodolistsActionsType & TasksActionsTypes & AppReducerActionsType