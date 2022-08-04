import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

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



    function removeTask(taskID: string, todoId: string) {
        //tasks = tasks.filter(task => task.id !== taskID)
        setTasks({...tasks, [todoId] : tasks[todoId].filter(task => task.id !== taskID)})

    }
    function changeFilter (value: FilterValueType, todoId: string) {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, filter: value} : todo))
    }

    function addTask(title: string, todoId: string) {
        let task = { id: v1(), title: title, isDone: false }
        //let newTasks = [task, ...tasks ]
        setTasks({...tasks, [todoId] : [task, ...tasks[todoId]]})
    }
    function changeIsDone ( taskId:string, value: boolean, todoId: string) {
        //setTasks( tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
       // setTasks({...tasks, [todoId]: tasks[]})
        setTasks({...tasks, [todoId]:
                tasks[todoId].map(task => task.id === taskId ? {...task, isDone: value} : task)})
    }
    function removeTodolist(todoId: string) {
        setTodolists(todolists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
    }


    return (
        <div className="App">
            {
               todolists.map(todolist => {
                   let taskForTodolist = tasks[todolist.id]
                   if (todolist.filter === 'active') {
                       taskForTodolist = tasks[todolist.id].filter(task => !task)
                   }
                   if (todolist.filter === 'completed') {
                       taskForTodolist = tasks[todolist.id].filter(task => task)
                   }
                return(
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
                        filter={todolist.filter}
                />)
               })
            }




        </div>
    );
}

export default App;
