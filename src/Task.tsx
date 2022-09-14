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
export const Task = memo(({
                              removeTask,
                              task,
                              changeTaskTitle,
                              changeIsDone,
                              todolistId
}: TaskPropsType) => {
    const onClickHandler = () => {
        removeTask(task.id, todolistId)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeIsDone(task.id, event.currentTarget.checked, todolistId);
    }
    const onChangeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todolistId)
    }, [changeTaskTitle, task.id, todolistId])
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox color='primary' checked={task.isDone} onChange={onChangeHandler}/>
            <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>

            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})