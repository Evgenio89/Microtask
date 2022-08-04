import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

 export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoId: string) => void
    changeFilter: (value: FilterValueType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeIsDone: (taskID: string, value: boolean, todoId: string) => void
    filter: string
    todoId: string
    removeTodolist: (todoId: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const  addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.todoId)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onClickHandler = () => {
      props.removeTodolist(props.todoId)
    }
    const onAllClickHandler = () => {props.changeFilter('all',props.todoId)}
    const onActiveClickHandler = () => {props.changeFilter('active' , props.todoId)}
    const onCompletedClickHandler = () => {props.changeFilter('completed',props.todoId)}

    return <div>
        <h3>{props.title}<button onClick={onClickHandler}>x</button></h3>
        <div>
            <input value={title} onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}
        />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div> }
        </div>
        <ul>
            {props.tasks.map((task) => {
                const onClickHandler = () => {props.removeTask(task.id, props.todoId)}
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDone(task.id,event.currentTarget.checked, props.todoId);
                }
                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                )
            })}

        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
