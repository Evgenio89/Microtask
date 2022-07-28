import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all' | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "ReactJS", isDone: false }

    ])
    let [filter, setFilter] =useState<'all' | 'active' | 'completed' >('all')
    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }

    function removeTask(taskID: string) {
        tasks = tasks.filter(task => task.id !== taskID)
        setTasks(tasks)
    }
    function changeFilter (value: FilterValueType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: true }
        let newTasks = [task, ...tasks ]
        setTasks(newTasks)
    }
    function changeIsDone ( taskId:string, value: boolean) {
        setTasks( tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
                      filter={filter}
            />
        </div>
    );
}

export default App;
