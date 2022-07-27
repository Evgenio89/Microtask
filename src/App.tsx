import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValueType = 'all' | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false },
            { id: 4, title: "ReactJS", isDone: false }

    ])
    let [filter, setFilter] =useState<'all' | 'active' | 'completed' >('all')
    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }

    function removeTask(taskID: number) {
        tasks = tasks.filter(task => task.id !== taskID)
        setTasks(tasks)
    }
    function changeFilter (value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
