import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import {DateValidator} from '../dateValidation'
import { Todo } from '../todo.model';
@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
todoId:string;
tempTodo: Todo;
editForm;
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router, private todo_service: TodoService ) {
      //checking if user should be here
      if(!this.todo_service.todos){
        this.router.navigate([''])
      }
      //getting todo id from param, getting copy of object that fits to that id
      this.todoId = this.route.snapshot.paramMap.get('todoId');
    this.tempTodo = this.todo_service.getSingleTodo(this.todoId)
    this.buildForm(this.tempTodo[0])
   }
handleDelete(){
if(window.confirm("are you sure?")){
  this.todo_service.removeTodo(this.todoId)
  this.router.navigate([''])
}
}
  
onSubmit(submitData):void{
  //handle submit after form is valid
if(this.editForm.valid){
  this.todo_service.editTodo({
    id:this.todoId,
    title:submitData.title,
    deadline: submitData.deadline
  })
  //if sucess then navigate to home page
  this.router.navigate([''])
  }
}
buildForm(todo){
  //form building
  this.editForm = this.formBuilder.group({
    title: [todo.title, Validators.compose([Validators.required])],
      deadline: [todo.deadline, Validators.compose([Validators.required,
         DateValidator.ptDate, DateValidator.isFuture])],
  })
}

  ngOnInit() {
    
  }

}
