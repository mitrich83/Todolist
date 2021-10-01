import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskStatuses, TaskType} from '../../../../api/todolist-api';


export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.todoListId, props.task.id)

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todoListId, props.task.id, title)
    },[props.todoListId, props.task.id, props.changeTaskTitle])


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todoListId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }
    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            color={'primary'}
            size={'small'}
            checked={props.task.status === TaskStatuses.Completed }
            onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
        <IconButton
            size={'small'}
            onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>

    </li>
})

// types

type TaskPropsType = {
    todoListId: string,
    removeTask: (todoListId: string, taskId: string) => void,
    task: TaskType,
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void,
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void,

}
