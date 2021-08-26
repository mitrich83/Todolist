import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [key: string]: Array<TaskType> }

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        dispatchToTasksReducer(removeTaskAC(todolistID, id))
    }

    function addTask(title: string, todolistID: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistID ))
    }

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskId, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistID, taskId, title))
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoListFilter(todolistID: string, filter: FilterValuesType) {
        dispatchToTodolistReducer(changeTodoListFilterAC(todolistID, filter))
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistID, title))
    }
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
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                        }

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

export default AppWithReducers;
