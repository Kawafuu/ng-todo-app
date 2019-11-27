import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { TodoService } from '../todo.service'
import * as moment from 'moment';
import {DateValidator} from '../dateValidation'
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
//local varriables here
addForm;
temp;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private todo_service: TodoService) { }

  ngOnInit() {
    //checking if user should be here
    if(!this.todo_service.todos){
      this.router.navigate([''])
    }
    //building add form
    this.addForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required, DateValidator.ptDate, DateValidator.isFuture])],
    })
 }
onSubmit(submitData){
  if(this.addForm.valid){
// if valid then add to todolist
this.temp = {
title: submitData.title,
id: uuid(),
created: moment().format('DD/MM/YYYY'),
deadline: submitData.date
}
this.todo_service.addTodo(this.temp)
//after sucessful add navigate to home page
this.router.navigate([''])
}
}
  }

