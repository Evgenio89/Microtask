import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {BabyChangingStation, Mediation, Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAc,
    changeTodolistTitleAc,
    removeTodolistAc,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | "active" | "completed"
export  type TodolistType = {
    id: string,
    title:string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    function changeTaskTitle ( taskId:string, title :string, todoId: string) {
        const action = changeTaskTitleAC(taskId, title, todoId)
        dispatch(action)
    }
    function changeIsDone ( taskId:string, value: boolean, todoId: string) {
        const action = changeTaskStatusAC(taskId, value, todoId)
        dispatch(action)
    }
    function addTask(title: string, todoId: string) {
        const action = addTaskAC(title, todoId)
        dispatch(action)
    }
    function removeTask(taskID: string, todoId: string) {
        const action = removeTaskAC(taskID, todoId)
        dispatch(action)
    }



    function changeFilter (value: FilterValueType, todoId: string) {
        const  action = changeTodolistFilterAc(todoId, value)
        dispatch(action)
    }
    function changeTodolistTitle (title:string, todoId: string) {
        const action = changeTodolistTitleAc(title , todoId)
        dispatch(action)
    }

    function removeTodolist(todoId: string) {
        const action = removeTodolistAc(todoId)
        dispatch(action)
        delete tasks[todoId]
    }
    function  addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action);
    }


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let taskForTodolist = tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                taskForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                taskForTodolist = tasks[todolist.id].filter(task => task.isDone)
                            }
                            return(<Grid item>
                                <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    todoId={todolist.id}
                                    title={todolist.title}
                                    tasks={taskForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeIsDone={changeIsDone}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    filter={todolist.filter}
                                />
                                </Paper>
                            </Grid>)
                        })
                    }
                </Grid>

            </Container>




        </div>
    );
}

export default AppWithRedux;
