// simple service with functions to add, get, edit, del todos(stored locally after fetch from api)
// storing data fetched from api
import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Todo } from './todo.model'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class TodoService implements OnInit{
todos;
// fetching todos from api
fetchTodos() :Observable<Todo[]>{
  if (this.todos){
    return this.todos
  }
  this.todos = this.http.get<Todo[]>('https://my-json-server.typicode.com/Kawafuu/demo/posts');
  return this.todos
}
 getTodos() :Array<Todo[]>{
  this.todos = this.todos.filter(item=>{
    return moment(item.deadline, 'DD/MM/YYYY').isSameOrAfter(moment(), 'day');
 })
  return (this.todos)
}

addTodo(todo):void{
// adding new todo to locally stored todos array
this.todos= [todo, ...this.todos]
}
removeTodo(todoId:string){
// removing single todo locally
this.setTodos(this.todos.filter(item=>{
  return item.id !== todoId
}))
}
editTodo(payload):void{
// editing single todo in the service
this.todos.forEach(item=>{
  if(item.id == payload.id ){
    item.title = payload.title
    item.deadline = payload.deadline
  }
})

}

setTodos(todos):void{
 this.todos = todos;
}
getSingleTodo(id): Todo{
  return this.todos.filter(item=>{
    return item.id == id
  })
}

  constructor(private http:HttpClient) {
    
    
}
ngOnInit(){
}
}
