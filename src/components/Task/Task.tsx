import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskType} from '../../Todolist';

type TaskPropsType = {
    todolistID: string,
    removeTask: (todolistID: string, taskId: string) => void,
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void,
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void,
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, title)
    },[props.todolistID, props.task.id, props.changeTaskTitle])
    const onClickHandler = () => props.removeTask(props.todolistID, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, props.task.id, e.currentTarget.checked);
    }
    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color={'primary'}
            size={'small'}
            checked={props.task.isDone}
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