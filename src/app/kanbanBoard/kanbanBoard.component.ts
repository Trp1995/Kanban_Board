import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  @ViewChild("ref") taskInput: ElementRef;
  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'test 0', stage: 0 },
      { name: 'test 1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
      console.log( "show task", this.stagesTasks)
    }
  }
  createTask = () => {
    console.log (this.taskInput.nativeElement.value);
    this.tasks.push({ name:this.taskInput.nativeElement.value , stage: 0 });
    this.configureTasksForRendering();
  }
  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  changeStage = (taskAction, taskName) => {
    let filter = this.tasks.filter(ele => ele.name === taskName );
    if (taskAction === 'forward'){
      filter[0].stage = filter[0].stage +1;
    }
    else if (taskAction === 'backward'){
      filter[0].stage = filter[0].stage -1;
    }
    else{
      this.tasks.forEach((element,index)=>{
      if(element.name === taskName) this.tasks.splice(index,1);
   });

    }
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}