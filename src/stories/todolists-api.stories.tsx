import React, {useEffect, useState} from 'react'

import {tasksAPI, todolistAPI} from '../api/todolist-api';


export default {
    title: 'API'
}

/*
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodo()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'newTitle'
       todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '095e7fcc-0094-4382-818a-685b336a5719'
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'updatedTitle'
        const todolistId = '55f96156-5b6d-46fc-8d46-e40c0240c494'
     todolistAPI.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b5b88a8f-6e12-4259-ae44-f66c471793c9'
        tasksAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickCreateTask = () => {
        tasksAPI.addTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input placeholder={'title for task'} value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={onClickCreateTask}>Create Task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const onClickDeleteTask = () => {
        tasksAPI.removeTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}
            />
            <button onClick={onClickDeleteTask}>Delete Task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickChangeTaskTitle = ()=> {
        tasksAPI.updateTaskTitle(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}
            />
            <input placeholder={'title for task'} value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={onClickChangeTaskTitle}>New Task Title</button>
        </div>
    </div>
}*/
