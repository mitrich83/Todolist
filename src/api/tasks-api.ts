 import axios from 'axios';
//
//
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'eccbb3eb-58c4-4ed7-895f-7ce56bc6ba31'
//     }
// })
//
// export const tasksAPI = {
//     getTask(todoListId: string) {
//        return  instance.get<TasksResponseType>(`${todoListId}/tasks`)
//     },
//     addTask(todoListId: string, title: string){
//         return instance.post<ResponseTaskType<{items: TaskType[]}>>(`${todoListId}/tasks`, {title})
//     },
//     removeTask(todoListId: string, taskId: string){
//         return instance.delete<ResponseTaskType>(`${todoListId}/tasks/${taskId}`)
//     },
//     updateTaskTitle(todoListId: string, taskId: string, title: string){
//         return instance.put<ResponseTaskType<{items: TaskType[]}>>(`${todoListId}/tasks/${taskId}`, {title})
//     }
// }
//
// type TasksResponseType = {
//     error: string | null
//     items: TaskType[]
//     totalCount: number
// }
// type TaskType = {
//     description: string
//     title: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: string
//     deadline: string
//     id: string
//     todoListId: string
//     order: number
//     addedDate: string
// }
// type ResponseTaskType<T = {}> = {
//     data: T,
//     fieldsErrors: string[],
//     messages: string[],
//     resultCode: number
// }