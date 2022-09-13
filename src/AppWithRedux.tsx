import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import { Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAc,
    changeTodolistTitleAc,
    removeTodolistAc,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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

    const changeTaskTitle = useCallback(( taskId:string, title :string, todoId: string) =>{
        const action = changeTaskTitleAC(taskId, title, todoId)
        dispatch(action)
    }, [dispatch])
    const changeIsDone = useCallback(( taskId:string, value: boolean, todoId: string) => {
        const action = changeTaskStatusAC(taskId, value, todoId)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todoId: string) => {
        const action = addTaskAC(title, todoId)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((taskID: string, todoId: string) => {
        const action = removeTaskAC(taskID, todoId)
        dispatch(action)
    }, [dispatch])



    const changeFilter = useCallback((value: FilterValueType, todoId: string) => {
        const  action = changeTodolistFilterAc(todoId, value)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((title:string, todoId: string) => {
        const action = changeTodolistTitleAc(title , todoId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoId: string) => {
        const action = removeTodolistAc(todoId)
        dispatch(action)
    }, [dispatch])
    const  addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action);
    }, [dispatch])


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
