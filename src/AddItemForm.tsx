import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = memo((props:AddItemFormPropsType) => {
    console.log('AddItemForm')
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const  addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return(
        <div>
            <TextField
                       variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!! error}
                       label='Title'
                       helperText={error}
            />
            <IconButton   color='primary'
                          onClick={addItem}>
                          <AddBox/>
            </IconButton>

        </div>
    )
})