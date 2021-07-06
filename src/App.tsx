import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all'|'active'|'completed'

const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'NodeJS', isDone: false},
    ])

    const removeTask = (taskID: string) => {
        // - тот же код но в две строки
        //const otherArr = tasks.filter(t => t.id !== taskID)
        //setTasks(otherArr)
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const  addTask = (title:string) => {
/*        const newTask:TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyTask = [...tasks]
        copyTask.push(newTask)
        setTasks(copyTask)*/
        setTasks([...tasks, {id: v1(), title: title, isDone: false}])
    }



    const [filter, setFilter]  = useState<FilterValueType>('all')
    const changeFilter = (nextFilter: FilterValueType) => {
        setFilter(nextFilter)
    }

    let tasksForRender = tasks
    if(filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone) // t.isDone === false
    }
    if(filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone) //t.isDone === true
    }


    // UI
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
