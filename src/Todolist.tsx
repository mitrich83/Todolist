import React from 'react';
import {FilterValueType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (nextFilter: FilterValueType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


const Todolist = (props: TodoListPropsType) => {
    const taskJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {taskJSXElements}
        </ul>
        <div>
            <button onClick={()=> props.changeFilter('all')}>All</button>
            <button onClick={()=> props.changeFilter('active')}>Active</button>
            <button onClick={()=> props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
export default Todolist
