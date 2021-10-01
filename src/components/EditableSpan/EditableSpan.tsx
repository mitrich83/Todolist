import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
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
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

// types
type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}