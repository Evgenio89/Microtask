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

export const Todolist = memo(({
                                  title,
                                  tasks,
                                  removeTask,
                                  changeFilter,
                                  addTask,
                                  changeIsDone,
                                  filter, todoId,
                                  removeTodolist,
                                  changeTaskTitle,
                                  changeTodolistTitle
}: PropsType) => {
      console.log('Todolist');
    const  addTaskItem = useCallback((title: string) => {
        addTask(title, todoId)
    }, [addTask, todoId])

    const onClickHandler = () => {
      removeTodolist(todoId)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, todoId)
    }, [changeTodolistTitle, todoId])

    const onAllClickHandler = useCallback(() => {changeFilter('all',todoId)}, [changeFilter, todoId])
    const onActiveClickHandler = useCallback(() => {changeFilter('active' , todoId)}, [changeFilter, todoId])
    const onCompletedClickHandler = useCallback(() => {changeFilter('completed',todoId)}, [changeFilter, todoId])

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }
    return <div>
        <h3>
            <EditableSpan title={title} onChangeTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskItem}/>
        <div>
            {
                taskForTodolist.map(task => <Task
                key={task.id}
                task={task}
                changeIsDone={changeIsDone}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                todolistId={todoId}
                />)
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler} color={"inherit"}>All</Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler} color={'primary'}>Active</Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler} color={'secondary'}>Completed</Button>
        </div>
    </div>
})


