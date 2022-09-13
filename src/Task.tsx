import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskID: string, todoId: string) => void
    changeIsDone: (taskID: string, value: boolean, todoId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeIsDone(props.task.id, event.currentTarget.checked, props.todolistId);
    }
    const onChangeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color='primary' checked={props.task.isDone} onChange={onChangeHandler}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTaskTitleHandler}/>

            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})