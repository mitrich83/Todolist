import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC, FilterValuesType,
    removeTodolistTC,
    setTodolistThunk,
    TodolistDomainType
} from './store/todolists-reducer';
import {
    addTaskTC,
    removeTaskTC,
    TasksStateType, updateTaskTC,
} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {TaskStatuses} from './api/todolist-api';


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(()=> {
        dispatch(setTodolistThunk())
    },[])

    const removeTask = useCallback((todoListId: string, taskId: string)=> {
        dispatch(removeTaskTC(todoListId, taskId))
    },[])

    const addTask = useCallback((todoListId: string, title: string)=> {
        dispatch(addTaskTC(todoListId, title))
    },[])

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses)=> {
        dispatch(updateTaskTC(todoListId, taskId, {status}))
    },[])

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title}))
    },[])

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    },[])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    },[])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType)=> {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    },[])

    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    },[])
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
                                        todoListId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
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
