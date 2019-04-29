window.onload = init;

function init() {
    getTodos();
    document.querySelector('#post').addEventListener('click', postTodo);
    // document.querySelector('#put').addEventListener('click', updateTodo);
}

function getTodos(event) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/todos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = populateData;
    xhr.send();
}

function postTodo(event) {
    event.preventDefault();
    const userInput = document.querySelector('#user-input').value;
    if(userInput !== "") {
        const newTodo = {
            text: userInput,
            completed: false
        };
        const jsonnedTodo = JSON.stringify(newTodo);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/todos');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = populateData;
        xhr.send(jsonnedTodo);
        
        document.querySelector('#user-input').value = '';
    }
}

function updateTodo(event) {
    const itemToBeUpdated = event.target;
    const listId = itemToBeUpdated.id;

    if(itemToBeUpdated.style.textDecoration === 'none') {
        const updatedTodo = {
            text: itemToBeUpdated.innerText,
            completed: true
        };
        itemToBeUpdated.style.textDecoration = 'line-through';
        const jsonnedTodo = JSON.stringify(updatedTodo);
        
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/todos/${listId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = handleData;
        xhr.send(jsonnedTodo);
    } else {
        const updatedTodo = {
            text: itemToBeUpdated.innerText,
            completed: false
        };
        itemToBeUpdated.style.textDecoration = 'none';
        const jsonnedTodo = JSON.stringify(updatedTodo);
        
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/todos/${listId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = handleData;
        xhr.send(jsonnedTodo);
    }
}

function handleData(event) {
    const newData = JSON.parse(event.target.responseText);
    const text = newData.text;
}

function populateData(event) {
    const rawData = JSON.parse(event.target.responseText);
    addToList(rawData);
    console.log(rawData)
}

function addToList(rawData) {
    const addingToUl = document.querySelector('#ol-list');
    if(addingToUl.childElementCount < rawData.length) {
        rawData.forEach((text, index) => {
            const newLi = document.createElement('li');
            newLi.innerText = text.text;
            newLi.id = (index + 1);
            newLi.addEventListener('click', updateTodo);
            addingToUl.appendChild(newLi);
        });
    } else {
        const newLi = document.createElement('li');
        newLi.innerText = rawData.text;
        addingToUl.appendChild(newLi);
        newLi.addEventListener('click', updateTodo);
    }
}
