import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType = {
    title: string
    changeTitle:(title:string)=> void
}
export const EditableSpan = (props: AddItemFormPropsType) => {
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
            ? <input  value={title} onChange={onChangeTitleHandler} onBlur={offEditMode} autoFocus={true}/>
            : <span onDoubleClick={onEditMode} >{props.title}</span>
    )
}