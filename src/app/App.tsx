import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC, FilterValuesType,
    removeTodolistTC,
    setTodolistThunk,
    TodolistDomainType
} from '../features/TodolistsList/todolists-reducer';
import {
    addTaskTC,
    removeTaskTC,
    TasksStateType, updateTaskTC,
} from '../features/TodolistsList/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskStatuses} from '../api/todolist-api';
import {TodolistList} from '../features/TodolistsList/TodolistList';


function App() {

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} arial-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color={'inherit'}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}

export default App;
