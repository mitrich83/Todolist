import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {TaskPriorities, TaskStatuses} from './api/todolist-api';


function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
                deadline: '',
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
                deadline: '',
            }
        ],
        [todolistID2]: [
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
                todoListId: todolistID2,
                deadline: '',
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID2,
                deadline: '',
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
                todoListId: todolistID2,
                deadline: '',
            },
        ]
    });

    function removeTask(todolistID: string, id: string) {
        dispatchToTasksReducer(removeTaskAC(todolistID, id))
    }

    function addTask(title: string, todolistID: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistID))
    }

    function changeTaskStatus(todolistID: string, taskId: string, status: TaskStatuses) {
        dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskId, status))
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

export default AppWithReducers;
