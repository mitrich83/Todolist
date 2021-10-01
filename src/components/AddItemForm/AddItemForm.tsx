import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { AddBox } from '@mui/icons-material';
import {RequestStatusType} from '../../app/app-reducer';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: RequestStatusType

}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean | undefined>(undefined)

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== undefined) {
            setError(undefined)
        }
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                error={error}
                helperText={error && 'Title is required'}
                disabled={props.disabled === 'loading'}
            />
            <IconButton
                size={'small'}
                color={'primary'}
                onClick={addItem}
                disabled={props.disabled === 'loading'}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})