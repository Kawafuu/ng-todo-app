import { Component, OnInit} from '@angular/core';
import { TodoService } from '../todo.service'
import * as moment from 'moment';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
todos;
date;
today = []
tomorrow = []
future = []
tempDate;

  constructor(private todo_service:TodoService) {
    
   }
   
  ngOnInit() {
    //i found this way more clear than using a lot of async everywhere
    //fetching todos, reflecting to service
    if(!this.todo_service.todos){
      this.todo_service.fetchTodos()
    .subscribe(data => {
    data = data.filter(item=>{
       return moment(item.deadline, 'DD/MM/YYYY').isSameOrAfter(moment(), 'day');
    })
    this.todos = data
    this.todo_service.setTodos(this.todos)
    //sorting by date
    this.sortByDate()
    })
    }
    else{
      //getting todos from starege's copy
      this.todos = this.todo_service.getTodos()
      //sorting by date
      this.sortByDate()
    }
  }
  checkDate(date){
    return (moment().diff(date, 'days') >= 1) ? date.fromNow() : date.calendar().split(' ')[0]
  }
  isFuture(item){
      return( moment(item.deadline, "DD/MM/YYYY") >= moment())
    
  
  }
sortByDate(){
  this.todos.forEach(item=>{
    this.date = moment(item.deadline, "DD/MM/YYYY")
    if(this.checkDate(this.date) == "Today"){
      this.today = [...this.today, item]
    }
   else if(this.checkDate(this.date) == "Tomorrow"){
      this.tomorrow = [...this.tomorrow, item]
    }
    else if(this.isFuture(item)) {
      this.future = [...this.future, item]
    }
  })

}

}