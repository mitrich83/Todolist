import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (nextFilter: FilterValueType) => void
    addTask: (title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const Todolist = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const taskJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}

    const onNewChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onNewKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onNewChangeHandler}
                   onKeyPress={onNewKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {taskJSXElements}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
export default Todolist
