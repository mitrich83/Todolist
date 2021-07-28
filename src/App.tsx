import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {id: string, title: string, filter: FilterValuesType}

type TasksGeneralType = {[key:string]:Array<TaskType>}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksGeneralType>({
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

    const removeTodolist = (todolistID:string) => {
       const currentTodolists = todolists.filter(r=> r.id !== todolistID)
        setTodolists(currentTodolists)
    }

    function removeTask(todolistID: string, id: string) {
        const currentTasks = tasks[todolistID]
        tasks[todolistID] = currentTasks.filter(fl => fl.id !== id)
        setTasks({...tasks})
    }

    function addTask(todolistID: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    function changeTaskStatus (todolistID: string, taskId: string, isDone: boolean) {
        const currentTasks = tasks[todolistID]
        const task = currentTasks.find(fl => fl.id === taskId)
        if(task) {
            task.isDone = isDone

        }
        setTasks({...tasks})
    }

    function changeTodoListFilter (todolistID: string, value: FilterValuesType) {
        const currentFilter = todolists.find(fl => fl.id === todolistID)
        if (currentFilter) {
            currentFilter.filter = value
            setTodolists([...todolists]);
        }
    }

    const addTodolist = (title:string)=> {
        const todolistID = v1()
        const newTodolist:TodolistsType = {
            id: todolistID,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: [] })
    }

    const changeTodolistTitle = (todolistID: string, title:string)=> {
        const newTodoList = todolists.find(tl=> tl.id === todolistID)
        if(newTodoList) {
            newTodoList.title = title
            setTodolists([...todolists])
        }
/*        setTodolists(
            todolists.map(tl=> tl.id === todolistID ? {...tl, title}:tl)
        )*/
    }

    const changeTaskTitle = (todolistID: string, taskId: string, title: string)=> {
        tasks[todolistID] =  tasks[todolistID]
            .map(t=> t.id === taskId ? {...t,title} : t)
        setTasks({...tasks}
        )
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus }
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
