
import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';

import {addTodolistAC, todolistID1} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
/*
let startState: TasksStateType = {}

beforeEach(()=> {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: '',
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''

            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                description: '',
                todoListId: todolistID1,
                deadline: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', ()=> {

    const action = addTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("todolistId2", "2", TaskStatuses.New);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title task should be change', ()=> {

    const action = changeTaskTitleAC("todolistId2", "2", 'water');
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('water');
    expect(endState["todolistId1"][1].title).toBe('JS');

})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
*/
