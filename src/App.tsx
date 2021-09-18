import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';
import {FilterValuesType, TodolistDomainType} from './store/todolists-reducer';

export type TasksStateType = { [key: string]: Array<TaskType> }

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: 'JS'
            },
            {
                id: v1(),
                title: '',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID2,
                deadline: ''
            },
            {
                id: v1(),
                title: 'TDD',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID2,
                deadline: ''
            },

        ]
    });

    const removeTodolist = (todolistID: string) => {
        const currentTodolists = todolists.filter(r => r.id !== todolistID)
        setTodolists(currentTodolists)
    }

    function removeTask(todolistID: string, id: string) {
        const currentTasks = tasks[todolistID]
        tasks[todolistID] = currentTasks.filter(fl => fl.id !== id)
        setTasks({...tasks})
    }

    function addTask(todolistID: string, title: string) {
        const newTask = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            completed: true,
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            todoListId: todolistID1,
            deadline: ''
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(todolistID: string, taskId: string, status: TaskStatuses) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, status: status} : t)})
    }

    function changeTodoListFilter(todolistID: string, filter: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistDomainType = {
            id: todolistID,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 3
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(
            todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl)
        )
    }

    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        tasks[todolistID] = tasks[todolistID]
            .map(t => t.id === taskId ? {...t, title} : t)
        setTasks({...tasks}
        )
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
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed);
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

export default App;
