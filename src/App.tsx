import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';
import {FilterValuesType, TodolistDomainType} from './store/todolists-reducer';
import {TasksStateType} from './store/tasks-reducer';


/*

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

    const removeTodolist = (todoListId: string) => {
        const currentTodolists = todolists.filter(r => r.id !== todoListId)
        setTodolists(currentTodolists)
    }

    function removeTask(todoListId: string, id: string) {
        const currentTasks = tasks[todoListId]
        tasks[todoListId] = currentTasks.filter(fl => fl.id !== id)
        setTasks({...tasks})
    }

    function addTask(todoListId: string, title: string) {
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
        tasks[todoListId] = [newTask, ...tasks[todoListId]]
        setTasks({...tasks})
    }

    function changeTaskStatus(todoListId: string, taskId: string, status: TaskStatuses) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, status: status} : t)})
    }

    function changeTodoListFilter(todoListId: string, filter: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
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

    const changeTodolistTitle = (todoListId: string, title: string) => {
        setTodolists(
            todolists.map(tl => tl.id === todoListId ? {...tl, title} : tl)
        )
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        tasks[todoListId] = tasks[todoListId]
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
                        debugger
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
                                        todoListId={tl.id}
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
*/
