import { Component, signal } from '@angular/core';
import {
 
  FormsModule,
 
 
} from '@angular/forms';

@Component({
  selector: 'app-first',
  imports: [FormsModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
})
export class FirstComponent {
 
  completedTasks: string[] = [];
  pendingTasks: string[] = [];

  taskCompleted = false;

  newValue = '';
  searchValue = '';
  foundValue = '';

  submitted = '';

 markPending() {
    
  }

  onSubmit() {
    console.log('Submitted!');

    window.localStorage.setItem(
      this.newValue,
      JSON.stringify({ value: this.newValue, status: 'Pending'})
    );
    this.allStorage.push(this.newValue);
    this.submitted = 'Successfully Submitted!';
    setTimeout(() => {
      this.submitted = '';
    }, 3000);
  }



  allStorage: string[] = [];

  showAll = () => {
    console.log('SHOW ALL');

    let x = 0;
    for (x; x < window.localStorage.length; x++) {
      this.allStorage.push(window.localStorage.key(x)!);
    }
    console.log(this.allStorage);
  };

  showPending() {
    console.log(window.localStorage);
  }

  showCompleteTasks = false;
  showComplete() {
    this.showCompleteTasks = true;
  }

  deleteTask(selectedTask: string) {
    console.log('Delete Task');
    window.localStorage.removeItem(selectedTask);
    this.allStorage = this.allStorage.filter((x) => x !== selectedTask);
  }

  markSatus(task: string) {

    this.taskCompleted = !this.taskCompleted;
  }

  deleteAllTasks() {
    console.log('Delete All Tasks');
    window.localStorage.clear();
    this.allStorage = [];
    this.completedTasks = [];
    this.pendingTasks = [];
    this.submitted = 'All tasks deleted!';

    setTimeout(() => {
      this.submitted = '';
    }, 3000);
  }
}
