var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todos = document.querySelector('.todos');

form.addEventListener('submit', function(e){
    e.preventDefault();
    // console.log('ok');
    let val = input.value.trim();
    if(val){
        // addTodoElement({
        //     text: val,
        //     status: 'completed',
        // })
        addTodoElement({
            text: val,
        })
        saveTodoList();
    }
    input.value = '';
})

function addTodoElement(todo){ //object todo
    /**
     {
        text: ,
        status: ,
     }
     */

     /**
        <li>
            <span>test</span>
            <i class="far fa-trash-alt"></i>
        </li>
      */

    var li = document.createElement('li'); // tạo ra 1 li ảo
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="far fa-trash-alt"></i>
    `

    if(todo.status === 'completed'){
        li.setAttribute('class', 'completed');
    }

    li.addEventListener('click', function(){
        // console.log(this);
        this.classList.toggle('completed');
        saveTodoList();
    })

    li.querySelector('i').addEventListener('click', function(){
        this.parentElement.remove();
    })
    
    todos.appendChild(li);
}

function saveTodoList(){
    let todoList = document.querySelectorAll('li');
    let todoStorage = [];
    todoList.forEach(function(item){
        // console.log(item);
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class');

        todoStorage.push({
            text,
            status
        })
    })
    localStorage.setItem('todolist', JSON.stringify(todoStorage));
    // console.log(localStorage.getItem('todolist'));
    // console.log(JSON.parse(localStorage.getItem('todolist')));
}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'));
    data.forEach(function(item){
        addTodoElement(item);
    })
}

init()


