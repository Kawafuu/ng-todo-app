import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TodoEditComponent,
    TodoAddComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', component: TodolistComponent},
      {path:'add', component: TodoAddComponent},
      {path: 'edit/:todoId', component: TodoEditComponent}
    ]),
    HttpClientModule,
    ReactiveFormsModule


  ],
  

  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
