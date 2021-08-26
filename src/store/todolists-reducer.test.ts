import {v1} from 'uuid';
import {FilterValuesType, TodolistsType} from '../App';
import {
    ActionType,
    addTodolistAC, changeTodoListFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

let todolistID1 = v1()
let todolistID2 = v1()

let startState: TodolistsType[] = []

beforeEach(()=> {
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]
})



test('remove todolists', () => {
        const endState: TodolistsType[] = todolistsReducer(startState,
            removeTodolistAC(todolistID1))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistID2)
    })

test('add todolist', ()=> {

    let newTodolist = 'New todolist'
    const endState: TodolistsType[] = todolistsReducer(startState,
        addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
})

test('change todolist title', ()=> {

    let newTodolistTitle = 'New todolist'

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistID: todolistID2,
        title: newTodolistTitle
    }

    const endState: TodolistsType[] = todolistsReducer(startState, changeTodolistTitleAC(todolistID2,newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('change todolist filter', ()=> {
    let newFilter: FilterValuesType = "all";

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: todolistID2,
        filter: newFilter
    }

    const endState: TodolistsType[] = todolistsReducer(startState, changeTodoListFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})