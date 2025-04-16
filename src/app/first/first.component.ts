import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-first',
  imports: [FormsModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
  
})

export class FirstComponent implements OnInit {


  localeTasks: string[] = [];

  MarkedAsCompleted = false;

 newValue= '';
searchValue= '' ;
foundValue=''
 
 status =""

 completedTasks: string[]= [];
 pendingTasks: string[] = []

addCompleted(){
  this.completedTasks.push(this.newValue)
}
 
addPending(){
  // this.completedTasks.push(this.newValue)
}

onSubmit(){

  console.log('Submitted!')
window.localStorage.setItem(this.newValue, this.newValue);
this.localeTasks.push(this.newValue)
this.status='Successfully Submitted!'
setTimeout(()=>{this.status = ''},3000) 

}

onFind(){

let x=0;
for(x; x<this.localeTasks.length; x++){
  if(this.localeTasks[x] == this.searchValue){
    this.foundValue = this.localeTasks[x];
    return 
  }else{
    this.foundValue = 'Task not found'
  }
};


}

showDropDown = false;
menu = ''
showDropdownMenu(){
  this.showDropDown = true
}


boolean = false


x=0;
holder: string= ''

showAll = ()=>{
 console.log('SHOW ALL')
 
this.boolean = true

};



showPending(){
 
  console.log(window.localStorage)

};

showCompleteTasks = false
showComplete(){
 
  this.showCompleteTasks = true
 
};

ngOnInit(): void {
  
}






}
