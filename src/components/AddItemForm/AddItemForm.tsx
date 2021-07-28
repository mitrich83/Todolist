import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import s from './InputItem.module.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = (props:AddItemFormPropsType)=> {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div className={s.inputItem}>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button className={s.inputItem} onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}