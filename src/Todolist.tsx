import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (nextFilter: FilterValueType) => void
    addTask: (title: string) => void
    filter: FilterValueType
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const Todolist = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const taskJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    className={'checkmark'}
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                />
                <span className={'title'}>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)} className={'button-delete'}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    const onNewChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onNewKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(title.trim() === '') {
            return setError(true)
        }
        if (e.key === 'Enter') {
            props.addTask(title.trim())
            setTitle('')
        }
        setError(false)
    }

    const errorMessage = error
        ? <div className={'error-text'}>Title is required</div>
        : null

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onNewChangeHandler}
                   onKeyPress={onNewKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
        <ul>
            {taskJSXElements}
        </ul>
        <div>
            <button onClick={onAllClickHandler}
                    className={props.filter === 'all' ? 'active-filter' : ''}>All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : ''}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
            </button>
        </div>
    </div>
}
export default Todolist
