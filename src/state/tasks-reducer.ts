import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {addTodolistACType, removeTodolistAc, removeTodolistAcType} from "./todolists-reducer";





export  const tasksReducer = (state: TasksStateType, action: tsarTaskType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoId] : state[action.payload.todoId].filter(task => task.id !== action.payload.taskID)
            }
        case 'ADD-TASK':
            const task: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state,
                [action.payload.todoId]: [task, ...state[action.payload.todoId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoId] : state[action.payload.todoId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.value} : task )
            }
        case  'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoId] : state[action.payload.todoId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            }
        case  'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.todolistId1]
            return copyState
        }
        default:
            return  state
    }
}



type tsarTaskType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addTodolistACType | removeTodolistAcType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const  removeTaskAC = (taskID: string, todoId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todoId
        }
    }as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const  addTaskAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todoId
        }
    }as const
}

export type  changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = ( taskId:string, value: boolean, todoId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            value,
            todoId
        }
    }as const
}

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId:string, title :string, todoId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            todoId
        }
    }as const
}



