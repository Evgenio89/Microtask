import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string
  onChangeTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)
  
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    props.onChangeTitle(title)
    setEditMode(false)
  }

  return(
      editMode
      ? <TextField
            variant='outlined'
            value={title}
            onChange={onChangeHandler}
            autoFocus
            onBlur={offEditMode}
          />
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  );
};