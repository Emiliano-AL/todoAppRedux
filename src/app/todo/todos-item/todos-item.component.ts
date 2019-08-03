import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico : ElementRef;
  editando:boolean; 

  chkFiled: FormControl;
  txtInput: FormControl;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkFiled = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkFiled.valueChanges
      .subscribe(() => {
        const action = new ToggleTodoAction(this.todo.id);
        this.store.dispatch(action);
      })
  }

  editar(){
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;
    if(this.txtInput.value === this.todo.texto){
      return;
    }
    if(this.txtInput.valid){
      const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
      this.store.dispatch(accion);
    }

  }

  borrarTodo(){
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }
}
