import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: ( taskId:string, title:string, todoId: string) => void
    changeTodolistTitle: (title:string, todoId: string) => void
}

export function Todolist(props: PropsType) {

    const  addTask = (title: string) => {
        props.addTask(title, props.todoId)
    }

    const onClickHandler = () => {
      props.removeTodolist(props.todoId)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todoId)
    }
    const onAllClickHandler = () => {props.changeFilter('all',props.todoId)}
    const onActiveClickHandler = () => {props.changeFilter('active' , props.todoId)}
    const onCompletedClickHandler = () => {props.changeFilter('completed',props.todoId)}

    return <div>
        <h3>
            <EditableSpan title={props.title} onChangeTitle={changeTodolistTitleHandler}/>
            <button onClick={onClickHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map((task) => {
                const onClickHandler = () => {props.removeTask(task.id, props.todoId)}
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDone(task.id,event.currentTarget.checked, props.todoId);
                }
                const onChangeTaskTitleHandler = (title: string) => {
                  props.changeTaskTitle(task.id, title, props.todoId)
                }
                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>

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

