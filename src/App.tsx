import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {BabyChangingStation, Mediation, Menu} from "@mui/icons-material";

export type FilterValueType = 'all' | "active" | "completed"
export  type TodolistType = {
    id: string,
    title:string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>( [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
        ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todoId]:
                tasks[todoId].map(task => task.id === taskId ? {...task, title} : task)})
    }
    function changeIsDone ( taskId:string, value: boolean, todoId: string) {
        setTasks({...tasks, [todoId]:
                tasks[todoId].map(task => task.id === taskId ? {...task, isDone: value} : task)})
    }
    function addTask(title: string, todoId: string) {
        let task = { id: v1(), title: title, isDone: false }
        //let newTasks = [task, ...tasks ]
        setTasks({...tasks, [todoId] : [task, ...tasks[todoId]]})
    }
    function removeTask(taskID: string, todoId: string) {
        setTasks({...tasks, [todoId] : tasks[todoId].filter(task => task.id !== taskID)})

    }



    function changeFilter (value: FilterValueType, todoId: string) {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, filter: value} : todo))
    }
    function changeTodolistTitle (title:string, todoId: string) {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, title} : todo))
    }

    function removeTodolist(todoId: string) {
        setTodolists(todolists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
    }
    function  addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []})
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

export default App;
