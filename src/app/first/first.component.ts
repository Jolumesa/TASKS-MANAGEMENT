import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-first',
  imports: [ReactiveFormsModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
})
export class FirstComponent {

myForm = new FormGroup({
  variable: new FormControl(''),
  variable2: new FormControl('', {
    validators: [],
  }),
});

  localeTasks: string[] = [];
  completedTasks: string[] = [];
  pendingTasks: string[] = [];

  MarkedAsCompleted = false;

  newValue = '';
  searchValue = '';
  foundValue = '';

  submitted = '';

  

  addPending() {
    // this.completedTasks.push(this.newValue)
  }

  onSubmit() {
    
    console.log('Submitted!');
    console.log(this.myForm)
    window.localStorage.setItem(this.newValue, this.newValue);
    this.localeTasks.push(this.newValue);
    this.submitted = 'Successfully Submitted!';
    setTimeout(() => {
      this.submitted = '';
    }, 3000);
  }

  onFind() {
    let x = 0;
    for (x; x < this.localeTasks.length; x++) {
      if (this.localeTasks[x] == this.searchValue) {
        this.foundValue = this.localeTasks[x];
        return;
      } else {
        this.foundValue = 'Task not found';
      }
    }
  }


   allStorage: string[] = [];

  showAll = () => {
    console.log('SHOW ALL');
    
    let x = 0;
    for(x; x<window.localStorage.length; x++){
this.allStorage.push(window.localStorage.key(x)!)}
    console.log(this.allStorage)
  };

  showPending() {
    console.log(window.localStorage);
  }

  showCompleteTasks = false;
  showComplete() {
    this.showCompleteTasks = true;
  }

deleteTask(){
  console.log('Delete Task')
  window.localStorage.removeItem('')
}
}
