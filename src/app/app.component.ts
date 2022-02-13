import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Todo } from './models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = "Lista de Compras";
  public form!: FormGroup;
  public mode = 'list';


  /**
   *
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      validacaoForm: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  add() {
    const produto_descricao = this.form.controls['validacaoForm'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, produto_descricao, false));
    this.save();
    this.clear();
  }
  clear() {
    this.form.reset();
  }
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }
  load() {
    this.todos = JSON.parse(localStorage.getItem('todos')!);
  }
  changeMode(mode: string) {
    this.mode = mode;
  }

}
