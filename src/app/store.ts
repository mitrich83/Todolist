import { tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { appReducer } from './app-reducer'
import {authReducer} from '../features/login/auth-reducer';

// combine reducers with combineReducers,
// set the structure of our single state object
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// here create store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// determine automatically the type of the entire state object
export type AppRootStateType = ReturnType<typeof rootReducer>

// and this, so that you can access the store at any time in the browser console
// @ts-ignore
window.store = store;
