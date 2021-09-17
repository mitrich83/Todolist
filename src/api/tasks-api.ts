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
//     getTask(todolistId: string) {
//        return  instance.get<TasksResponseType>(`${todolistId}/tasks`)
//     },
//     createTask(todolistId: string, title: string){
//         return instance.post<CommonResponseTaskType<{items: TaskType[]}>>(`${todolistId}/tasks`, {title})
//     },
//     deleteTask(todolistId: string, taskId: string){
//         return instance.delete<CommonResponseTaskType>(`${todolistId}/tasks/${taskId}`)
//     },
//     updateTaskTitle(todolistId: string, taskId: string, title: string){
//         return instance.put<CommonResponseTaskType<{items: TaskType[]}>>(`${todolistId}/tasks/${taskId}`, {title})
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
// type CommonResponseTaskType<T = {}> = {
//     data: T,
//     fieldsErrors: string[],
//     messages: string[],
//     resultCode: number
// }