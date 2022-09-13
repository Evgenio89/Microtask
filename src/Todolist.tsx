import React, {memo, useCallback} from 'react';
import {FilterValueType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";


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

export const Todolist = memo((props: PropsType) => {
      console.log('Todolist');
    const  addTask = useCallback((title: string) => {
        props.addTask(title, props.todoId)
    }, [props.addTask, props.todoId])

    const onClickHandler = () => {
      props.removeTodolist(props.todoId)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todoId)
    }, [props.changeTodolistTitle, props.todoId])

    const onAllClickHandler = useCallback(() => {props.changeFilter('all',props.todoId)}, [props.changeFilter, props.todoId])
    const onActiveClickHandler = useCallback(() => {props.changeFilter('active' , props.todoId)}, [props.changeFilter, props.todoId])
    const onCompletedClickHandler = useCallback(() => {props.changeFilter('completed',props.todoId)}, [props.changeFilter, props.todoId])

    let taskForTodolist = props.tasks
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => task.isDone)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChangeTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                taskForTodolist.map(task => <Task
                key={task.id}
                task={task}
                changeIsDone={props.changeIsDone}
                changeTaskTitle={props.changeTaskTitle}
                removeTask={props.removeTask}
                todolistId={props.todoId}
                />)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler} color={"inherit"}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler} color={'primary'}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler} color={'secondary'}>Completed</Button>
        </div>
    </div>
})


