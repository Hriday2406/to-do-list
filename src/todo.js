import { format } from "date-fns";

class ToDo {
    constructor(id, title, description, dueDate, priority, status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "dd / MM / yyyy");
        this.priority = priority;
        this.status = status;
    }
}

function storeTodoList() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function getTodoList() {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
}

let toDoList = [];

const createTodo = (title, desc, dueDate, priority, status) => {
    let id = toDoList.length;
    toDoList.push(new ToDo(id, title, desc, dueDate, priority, status));

    storeTodoList();
    return id;
}

const readTodo = (id) => {
    getTodoList();
    return toDoList[id];
}

const updateTodo = (id, title, desc, dueDate, priority) => {
    let todo = readTodo(id);
    todo.title = title;
    todo.description = desc;
    todo.dueDate = format(dueDate, "dd / MM / yyyy");
    todo.priority = priority;
    storeTodoList();
}

const deleteTodo = (id) => {
    delete toDoList[id];
    storeTodoList();
}

const getTodoCount = () => {
    getTodoList();
    return toDoList.length;
}

const changeTodoStatus = (id, status) => {
    readTodo(id).status = status;
    storeTodoList();
} 

export { createTodo, readTodo, updateTodo, deleteTodo, getTodoCount, changeTodoStatus, toDoList }