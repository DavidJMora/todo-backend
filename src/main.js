window.onload = init;

function init() {
    getTodos();
    document.querySelector('#get').addEventListener('click', getTodos);
    document.querySelector('#post').addEventListener('click', postTodo);
    document.querySelector('#put').addEventListener('click', updateThirdTodo);
}

function getTodos(event) {
    // event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/todos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
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
        xhr.onload = handleData;
        xhr.send(jsonnedTodo);
        
        document.querySelector('#user-input').value = '';
    }
}

function updateThirdTodo(event) {
    const updatedTodo = {
        text: '????',
        completed: true
    };
    const jsonnedTodo = JSON.stringify(updatedTodo);
    
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/todos/3');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send(jsonnedTodo);
}

function handleData(event) {
    const rawData = JSON.parse(event.target.responseText);
    addToList(rawData);
    console.log(rawData)
}

function addToList(rawData) {
    const addingToUl = document.querySelector('#list-items');
    if(addingToUl.childElementCount < rawData.length) {
        rawData.forEach((text) => {
            const newLi = document.createElement('li');
            newLi.innerText = text.text;
            addingToUl.appendChild(newLi);
        });
    } else {
        const newLi = document.createElement('li');
        console.log(rawData.text)
        newLi.innerText = rawData.text;
        addingToUl.appendChild(newLi);
    }
}
