import {v1} from 'uuid';
import {FilterValuesType, TodolistsType} from '../App';
import {
    ActionType,
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from './todolists-reducer';


test('remove todolists', () => {
        let todolistID1 = v1()
        let todolistID2 = v1()

        const startState: TodolistsType[] = [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'}
        ]

        const endState: TodolistsType[] = todolistsReducer(startState,
            RemoveTodoListAC(todolistID1))
        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistID2)
    })

test('add todolist', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTodolist = 'New todolist'

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]
    const endState: TodolistsType[] = todolistsReducer(startState,
        AddTodoListAC(newTodolist))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
})

test('change todolist title', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTodolistTitle = 'New todolist'

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistID: todolistID2,
        title: newTodolistTitle
    }

    const endState: TodolistsType[] = todolistsReducer(startState, ChangeTodolistTitleAC(todolistID2,newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('change todolist filter', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newFilter: FilterValuesType = "all";

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: todolistID2,
        filter: newFilter
    }

    const endState: TodolistsType[] = todolistsReducer(startState, ChangeTodoListFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})