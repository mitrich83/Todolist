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
       return  instance.get<TodoType[]>('todo-lists')
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