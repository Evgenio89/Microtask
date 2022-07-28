import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeIsDone: (taskID: string, value: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const  addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
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
    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}

    return <div>
        <h3>{props.title}</h3>
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
                const onClickHandler = () => {props.removeTask(task.id)}
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDone(task.id,event.currentTarget.checked);
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
