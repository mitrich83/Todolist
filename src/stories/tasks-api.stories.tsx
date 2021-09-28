import React, {useEffect, useState} from 'react'



export default {
    title: 'API'
}

// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoListId = 'b5b88a8f-6e12-4259-ae44-f66c471793c9'
//         tasksAPI.getTask(todoListId)
//             .then((res) => {
//                 setState(res.data)
//             })
//
//     }, [])
//     return <div> {JSON.stringify(state)}</div>
// }
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoListId, setTodolistId] = useState<string>('')
//     const [title, setTitle] = useState<string>('')
//
//     const onClickCreateTask = () => {
//         tasksAPI.addTask(todoListId, title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//     return <div> {JSON.stringify(state)}
//         <div>
//             <input placeholder={'todoListId'} value={todoListId}
//                    onChange={(e) => {
//                        setTodolistId(e.currentTarget.value)
//                    }}
//             />
//             <input placeholder={'title for task'} value={title}
//                    onChange={(e) => {
//                        setTitle(e.currentTarget.value)
//                    }}
//             />
//             <button onClick={onClickCreateTask}>Create Task</button>
//         </div>
//     </div>
// }
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoListId, setTodolistId] = useState<string>('')
//     const [taskId, setTaskId] = useState<string>('')
//
//     const onClickDeleteTask = () => {
//         tasksAPI.removeTask(todoListId, taskId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div> {JSON.stringify(state)}
//         <div>
//             <input placeholder={'todoListId'} value={todoListId}
//                    onChange={(e) => {
//                        setTodolistId(e.currentTarget.value)
//                    }}
//             />
//             <input placeholder={'taskId'} value={taskId}
//                    onChange={(e) => {
//                        setTaskId(e.currentTarget.value)
//                    }}
//             />
//             <button onClick={onClickDeleteTask}>Delete Task</button>
//         </div>
//     </div>
// }
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoListId, setTodolistId] = useState<string>('')
//     const [taskId, setTaskId] = useState<string>('')
//     const [title, setTitle] = useState<string>('')
//
//     const onClickChangeTaskTitle = ()=> {
//         tasksAPI.updateTaskTitle(todoListId, taskId, title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//     return <div> {JSON.stringify(state)}
//         <div>
//             <input placeholder={'todoListId'} value={todoListId}
//                    onChange={(e) => {
//                        setTodolistId(e.currentTarget.value)
//                    }}
//             />
//             <input placeholder={'taskId'} value={taskId}
//                    onChange={(e) => {
//                        setTaskId(e.currentTarget.value)
//                    }}
//             />
//             <input placeholder={'title for task'} value={title}
//                    onChange={(e) => {
//                        setTitle(e.currentTarget.value)
//                    }}
//             />
//             <button onClick={onClickChangeTaskTitle}>New Task Title</button>
//         </div>
//     </div>
// }