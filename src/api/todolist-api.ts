import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'eccbb3eb-58c4-4ed7-895f-7ce56bc6ba31'
    }
})

export type CommonResponseType<T = {}> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}

export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export const todolistAPI = {
    getTodo() {
        return instance.get<TodolistsType[]>('todo-lists/')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistsType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low ,
    Middle,
    High,
    Urgently,
    Later
}

export type TasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type CommonResponseTaskType<T = {}> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}

export const tasksAPI = {
    getTask(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseTaskType<{ items: TaskType[] }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseTaskType<{ items: TaskType[] }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}
