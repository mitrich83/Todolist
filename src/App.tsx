import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';

export type FilterValueType = 'all'|'active'|'completed'

const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'ReactJS', isDone: false},
        {id: 5, title: 'NodeJS', isDone: false},
    ])

    const removeTask = (taskID: number) => {
        // - тот же код но в две строки
        //const otherArr = tasks.filter(t => t.id !== taskID)
        //setTasks(otherArr)
        setTasks(tasks.filter(t => t.id !== taskID))
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
            />
        </div>
    );
}

export default App;
