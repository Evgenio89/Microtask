import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";




export  const todolistsReducer = (state: Array<TodolistType>, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todolistId1)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTodolistTitle, filter: 'all'};
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.payload.todolistId2 ? {...todo, title: action.payload.newTodolistTitle} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return  state.map(todo => todo.id === action.payload.todolistId2 ? {...todo, filter: action.payload.newFilter} :todo)
        default:
            return  state
    }
}

type tsarType= removeTodolistAcType | addTodolistACType | changeTodolistTitleAcType | changeTodolistFilterAcType


type removeTodolistAcType = ReturnType<typeof removeTodolistAc>
export const  removeTodolistAc = (todolistId1:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    }as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export  const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle}
    }as const
}

type changeTodolistTitleAcType = ReturnType<typeof changeTodolistTitleAc>
export const changeTodolistTitleAc = (todolistId2: string, newTodolistTitle: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    }as const
}

type changeTodolistFilterAcType = ReturnType<typeof changeTodolistFilterAc>
export const changeTodolistFilterAc = (todolistId2:string, newFilter: FilterValueType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    }as const
}