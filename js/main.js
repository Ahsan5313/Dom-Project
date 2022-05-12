
window.onload = function(){

    const taskField = document.querySelector('#taskField');
    const addTaskBtn = document.querySelector('#addTaskBtn');
    const allTaskParent = document.querySelector('#allTask');

    taskField.addEventListener('keypress', function(event) {

      if(event.keyCode === 13){
       
         createNewTask(allTaskParent, event.target.value)       
        this.value = '';
         
      }
    })
}

function createNewTask(parent, task){

    let col = document.createElement('div');
    col.classList.add('col-sm-3')
    let singleTask = document.createElement('div');
    singleTask.classList.add('single-task', 'd-flex')
    let singleTaskP = document.createElement('p');
    singleTaskP.innerHTML = task;

    let span = document.createElement('span');
    span.innerHTML = '<i class="fas fa-times-circle"></i>';
    span.classList.add('px-2');
     span.style.cursor = 'pointer';
    span.addEventListener('click', function(){

        parent.removeChild(col)
    })
    singleTask.appendChild(span)
    singleTask.appendChild(singleTaskP)

    let taskController = createTaskController(singleTask);
    taskController.style.visibility = 'hidden'
    singleTask.appendChild(taskController)

    singleTask.onmouseover = function(){

        taskController.style.visibility = 'visible';
    }

    singleTask.onmouseleave = function(){

      taskController.style.visibility = 'hidden';
    }
  
    col.appendChild(singleTask)
    parent.appendChild(col)

}

function createTaskController(parent){

    let controlPanel = document.createElement('div');
    controlPanel.classList.add('task-control-panel', 'd-flex', 'align-items-center');

    let colorPallet = createColorPallet(parent);
    controlPanel.appendChild(colorPallet)

    let editBtn = createEditBtn(parent);
    controlPanel.appendChild(editBtn);

    return controlPanel
}

function createColorPallet(parent){

  const colors = ['palegreen', 'skyblue', 'salmon', 'red', 'green', 'powderblue', 'grey'];

  let colorDiv = document.createElement('div');
  colorDiv.classList.add('d-flex')



  colors.forEach(color => {


    let div = document.createElement('div');
   
    div.classList.add('color-circle');
    div.style.background = color;
    div.style.cursor = 'pointer';
    div.addEventListener('click', function() {

     parent.style.background = color;

    })
    colorDiv.appendChild(div)
  })

 

  return colorDiv
}

function createEditBtn(parent){

  let span = document.createElement('span');
  span.classList.add('ml-auto', 'px-5');
  span.style.color = 'white';
  span.innerHTML = '<i class="fas fa-edit"></i>';
  span.style.cursor = 'pointer';
  span.addEventListener('click', function(){

    let p = parent.querySelector('p');
    let textArea = document.createElement('textarea');
    textArea.classList.add('inner-textArea');
    textArea.style.width = parent.offsetWidth + 'px';
    textArea.style.height = parent.offsetHeight + 'px';
    textArea.innerHTML = p.innerHTML;

    textArea.addEventListener('keypress', function(event){

      if(event.keyCode === 13){

        event.stopPropagation()
        if(this.value){

           p.innerHTML = this.value
           parent.removeChild(this)
        }else{

          alert('Please Some Date')
        }
      }
    })

    parent.appendChild(textArea);
  })

  return span
}