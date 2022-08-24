import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAc, changeTodolistTitleAc, removeTodolistAc} from "./state/todolists-reducer";

 export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist1({todolist}: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    const dispatch = useDispatch()

    const  addTask = (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }

    const onClickHandler = () => {
        dispatch(removeTodolistAc(todolist.id))
    }
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAc(todolist.id, title))
    }
    const onAllClickHandler = () => {dispatch(changeTodolistFilterAc(todolist.id, 'all'))}
    const onActiveClickHandler = () => {dispatch(changeTodolistFilterAc(todolist.id, 'active'))}
    const onCompletedClickHandler = () => {dispatch(changeTodolistFilterAc(todolist.id, 'completed'))}


    if (todolist.filter === 'active') {
        tasks = tasks.filter(task => task.isDone === false)
    }
    if (todolist.filter === 'completed') {
        tasks = tasks.filter(task => task.isDone === true)
    }

    return <div>
        <h3>
            <EditableSpan title={todolist.title} onChangeTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasks.map((task) => {
                const onClickHandler = () => {const action = removeTaskAC(task.id, todolist.id)
                    dispatch(action)}
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    const action = changeTaskStatusAC(task.id, event.currentTarget.checked, todolist.id)
                    dispatch(action)
                }
                const onChangeTaskTitleHandler = (title: string) => {
                    const action = changeTaskTitleAC(task.id, title, todolist.id)
                    dispatch(action)
                }
                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox color='primary' checked={task.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>

                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                )
            })}

        </ul>
        <div>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler} color={"inherit"}>All</Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler} color={'primary'}>Active</Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler} color={'secondary'}>Completed</Button>
        </div>
    </div>
}

