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

export type FilterValueType = 'all' | "active" | "completed"
export  type TodolistType = {
    id: string,
    title:string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}

        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })

    function changeTaskTitle ( taskId:string, title :string, todoId: string) {
        const action = changeTaskTitleAC(taskId, title, todoId)
        dispatchToTasks(action)
    }
    function changeIsDone ( taskId:string, value: boolean, todoId: string) {
        const action = changeTaskStatusAC(taskId, value, todoId)
        dispatchToTasks(action)
    }
    function addTask(title: string, todoId: string) {
        const action = addTaskAC(title, todoId)
        dispatchToTasks(action)
    }
    function removeTask(taskID: string, todoId: string) {
        const action = removeTaskAC(taskID, todoId)
        dispatchToTasks(action)
    }



    function changeFilter (value: FilterValueType, todoId: string) {
        const  action = changeTodolistFilterAc(todoId, value)
        dispatchToTodolist(action)
    }
    function changeTodolistTitle (title:string, todoId: string) {
        const action = changeTodolistTitleAc(title , todoId)
        dispatchToTodolist(action)
    }

    function removeTodolist(todoId: string) {
        const action = removeTodolistAc(todoId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    function  addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasks(action);
        dispatchToTodolist(action)
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

export default AppWithReducers;
