import { Component, OnInit, signal } from '@angular/core';
import {
 
  FormsModule,
 
 
} from '@angular/forms';

@Component({
  selector: 'app-first',
  imports: [FormsModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
})
export class FirstComponent implements OnInit {
 
  completedTasks: string[] = [];
  pendingTasks: string[] = [];
  allStorage: string[] = [];
  taskCompleted = false;
  showAllTasks = false;
  newValue = '';
  searchValue = '';
  foundValue = '';
  tempMessage = '';

ngOnInit() {
  let x = 0;
  for (x; x < window.localStorage.length; x++) {if(!this.allStorage.includes(window.localStorage.key(x)!))
    this.allStorage.push(window.localStorage.key(x)!);
  };
}

  onSubmit() {
    console.log('Submitted!');
    if (this.allStorage.includes(this.newValue)) {
     
    this.tempMessage = 'ERROR: Task already exists!';
    setTimeout(() => {
      this.tempMessage = '';
    }, 3000);
  } else {
    this.tempMessage = 'Successfully Submitted!';
    setTimeout(() => {
      this.tempMessage = '';
    }, 3000);
  }
    window.localStorage.setItem(
      this.newValue,
      JSON.stringify({ value: this.newValue, status: 'Pending'})
    );
    let x = 0;
    for (x; x < window.localStorage.length; x++) {if(!this.allStorage.includes(window.localStorage.key(x)!)){
      this.allStorage.push(window.localStorage.key(x)!);}
    };
 
};

  showAll()  {
  this.showAllTasks = !this.showAllTasks;
    
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
    if(window.confirm('This action will remove all your tasks permanently. Do you want to continue?')) {
    console.log('Delete All Tasks');
    window.localStorage.clear();
    this.allStorage = [];
    this.completedTasks = [];
    this.pendingTasks = [];
    this.tempMessage = 'All tasks deleted!';

      setTimeout(() => {
        this.tempMessage = '';
      }, 3000);
    }
  }
}
