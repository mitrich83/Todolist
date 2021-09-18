import React, {useCallback, useReducer} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {TaskStatuses} from './api/todolist-api';
import {TasksStateType} from './App';

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((todolistID: string, id: string)=> {
        dispatch(removeTaskAC(todolistID, id))
    },[dispatch])

    const addTask = useCallback((title: string, todolistID: string)=> {
        dispatch(addTaskAC(title, todolistID ))
    },[dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses)=> {
        dispatch(changeTaskStatusAC(todolistID, taskId, status))
    },[dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, title))
    },[dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    const changeTodoListFilter = useCallback((todolistID: string, filter: FilterValuesType)=> {
        dispatch(changeTodoListFilterAC(todolistID, filter))
    },[dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    },[dispatch])
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
                <Grid
                    container
                    style={{padding: '10px 0'}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}
                >
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];


                        return (
                            <Grid item key={tl.id}
                            >
                                <Paper style={{padding: '10px'}}
                                       elevation={5}
                                >
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
