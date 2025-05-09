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
 stringStatus: string = '';
 statusPending: {value: string, status: string}[] = [];
 statusCompleted: {value: string, status: string}[] = [];
 statusAll: {value: string, status: string}[] = [];
  completedTasks: string[] = [];
  pendingTasks: string[] = [];
   allStorage: string[] = [];
  taskCompleted = false;
  showAllTasks = false;
  deleteAll = false
  submit = false;
  newValue = signal('');
  tempMessage = '';

  showPendingTasks = false; 
  showPending() {
    this.showCompletedTasks = false;
    this.showAllTasks = false;
    this.showPendingTasks = !this.showPendingTasks;
    for(let i = 0; i < window.localStorage.length; i++) {
      let x = JSON.parse( window.localStorage.getItem(window.localStorage.key(i)!)!)
      if(x.status == 'Pending' && this.pendingTasks.includes(x.value) == false){
        this.pendingTasks.push(x.value)
      }
    }
  }


  showCompletedTasks = false; 
  showCompleted() {
    this.showPendingTasks = false;
    this.showAllTasks = false;
    this.showCompletedTasks = !this.showCompletedTasks;
    for(let i = 0; i < window.localStorage.length; i++) {
      let x = JSON.parse( window.localStorage.getItem(window.localStorage.key(i)!)!)
      if(x.status == 'Completed' && this.completedTasks.includes(x.value) == false){
        this.completedTasks.push(x.value)
      }
    }
  }


ngOnInit() {

  let x = 0;
  for (x; x < window.localStorage.length; x++) {if(!this.allStorage.includes(window.localStorage.key(x)!)){
    this.allStorage.push(window.localStorage.key(x)!);
  };}

  for (let i = 0; i < window.localStorage.length; i++) {
    let x = JSON.parse( window.localStorage.getItem(window.localStorage.key(i)!)!)
    if(x.status == 'Pending' && this.pendingTasks.includes(x.value) == false){
      this.pendingTasks.push(x.value)
      this.statusPending.push(x)
    }
  };

  for (let i = 0; i < window.localStorage.length; i++) {
    let x = JSON.parse( window.localStorage.getItem(window.localStorage.key(i)!)!)
    if(x.status == 'Completed' && this.completedTasks.includes(x.value) == false){
      this.completedTasks.push(x.value)
      
      this.statusCompleted.push(x) 
    }
  };

 this.statusAll = [...this.statusPending, ...this.statusCompleted]

  
}

  onSubmit() {
    if(this.newValue() == '') {
      this.tempMessage = 'ERROR: Task cannot be empty!';
      setTimeout(() => {
        this.tempMessage = '';
      }, 3000);
      return
    }
    this.submit = true;
    setTimeout(() => {
      this.submit = false;}, 200);

    if (this.allStorage.includes(this.newValue())) {
     
    this.tempMessage = 'ERROR: Task already exists!';
    setTimeout(() => {
      this.tempMessage = '';
    }, 3000);
    return
  } else {
    this.tempMessage = 'Successfully Submitted!';
    setTimeout(() => {
      this.tempMessage = '';
    }, 3000);
  }
    window.localStorage.setItem(
      this.newValue(),
      JSON.stringify({ value: this.newValue, status: 'Pending'})
    );
    this.statusPending.push({ value: this.newValue(), status: 'Pending'})
    let x = 0;
    for (x; x < window.localStorage.length; x++) {if(!this.allStorage.includes(window.localStorage.key(x)!)){
      this.allStorage.push(window.localStorage.key(x)!);}
    };
    
    this.statusAll = [...this.statusPending, ...this.statusCompleted]
    this.newValue.set('');
};



  showAll()  {
    
    this.showAllTasks = !this.showAllTasks;
    this.showPendingTasks = false
  this.showCompletedTasks = false;
 
  
  };

 

  

  deleteTask(selectedTask: string) {
    if(window.confirm('This task will be permanently removed. Do you want to continue?')) {
    window.localStorage.removeItem(selectedTask);
    this.allStorage = this.allStorage.filter((x) => x !== selectedTask); 
    this.completedTasks = this.completedTasks.filter((x) => x !== selectedTask);
    this.pendingTasks = this.pendingTasks.filter((x) => x !== selectedTask); 
    this.statusAll = this.statusAll.filter((x) => x.value !== selectedTask);
    this.statusPending = this.statusPending.filter((x) => x.value !== selectedTask);  
    this.statusCompleted = this.statusCompleted.filter((x) => x.value !== selectedTask);}
    this.tempMessage = 'Task deleted!';
    setTimeout(() => {
      this.tempMessage = '';
    }, 3000);
  }



  markCompleted(taskValue: string) {
    if( window.confirm('This task will be marked as completed')){
for(let i = 0; i < this.statusPending.length; i++) {
  if(this.statusPending[i].value == taskValue) {
    this.statusPending[i].status = 'Completed';

    window.localStorage.setItem(this.statusPending[i].value, JSON.stringify(this.statusPending[i]));
    
    this.statusCompleted.push({ value: taskValue, status: 'Completed'});
    this.completedTasks.push(taskValue);
    this.pendingTasks = this.pendingTasks.filter((x) => x !== taskValue);
    this.statusPending = this.statusPending.filter((x) => x.value !== taskValue);
    this.statusAll = [...this.statusPending, ...this.statusCompleted]
    
   
   
  }}}}

  markPending(taskValue: string) {
  if( window.confirm('This task will be marked as pending')){
    for(let i = 0; i < this.statusCompleted.length; i++) {
      if(this.statusCompleted[i].value == taskValue) {
        this.statusCompleted[i].status = 'Pending';
    
        window.localStorage.setItem(this.statusCompleted[i].value, JSON.stringify(this.statusCompleted[i]));
     
      this.statusPending.push({ value: taskValue, status: 'Pending'});
      this.pendingTasks.push(taskValue);
      this.completedTasks = this.completedTasks.filter((x) => x !== taskValue);
      this.statusCompleted = this.statusCompleted.filter((x) => x.value !== taskValue);
      this.statusAll = [...this.statusPending, ...this.statusCompleted]
      
      }
    }
      }}



  deleteAllTasks() {
    this.deleteAll = true
    this.showAllTasks = false;
    this.showPendingTasks = false;
    this.showCompletedTasks = false;

    setTimeout(() => {
    if(window.confirm('This action will remove all your tasks permanently. Do you want to continue?')) {
    console.log('Delete All Tasks');
    window.localStorage.clear();
    this.allStorage = [];
    this.completedTasks = [];
    this.pendingTasks = [];
    this.statusAll = [];
    this.statusPending = [];
    this.statusCompleted = [];
    this.tempMessage = 'All tasks deleted!';

      setTimeout(() => {
        this.tempMessage = '';
      }, 3000);
    }
  }, 1)
  setTimeout(() => {
    this.deleteAll = false;
  }, 1);
}}
