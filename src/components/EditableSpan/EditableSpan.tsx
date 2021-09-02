import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    title: string
    changeTitle:(title:string)=> void
}
export const EditableSpan = React.memo((props: AddItemFormPropsType) => {
    console.log('EditableSpan')
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        props.changeTitle(title)
    }

    return (
        editMode
            ?
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={offEditMode}
                autoFocus={true}
                />
            : <span onDoubleClick={onEditMode} >{props.title}</span>
    )
})