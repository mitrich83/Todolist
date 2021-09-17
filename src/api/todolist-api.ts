import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'eccbb3eb-58c4-4ed7-895f-7ce56bc6ba31'
    }
})

export const todolistAPI = {
    getTodo() {
       return  instance.get<TodoType[]>('todo-lists/')
    },
    createTodo(title: string){
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string){
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string){
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type CommonResponseType<T = {}> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export const tasksAPI = {
    getTask(todolistId: string) {
        return  instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<CommonResponseTaskType<{items: TaskType[]}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CommonResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string){
        return instance.put<CommonResponseTaskType<{items: TaskType[]}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

type TasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type CommonResponseTaskType<T = {}> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}