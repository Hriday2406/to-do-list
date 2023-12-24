import { createTodo, readTodo, updateTodo, deleteTodo, getTodoCount, changeTodoStatus } from './todo'
import { newProject, insertProject, deleteProject, deleteId, getProjects, getProjectKeys } from './projects'
import { format, parse } from "date-fns";

const addCategoryHover = (function() {
    const categories = document.querySelectorAll('.category');
    const home = document.getElementById('home');

    const addActiveClass = (e) => {
        if(e.target.classList.contains('active') == false)
            e.target.textContent = `"${e.target.textContent}"`;
    }
    const removeActiveClass = (e) => {
        if(e.target.classList.contains('active') == false){
            let temp = e.target.textContent;
            e.target.textContent = temp.slice(1, -1);
        }
    }

    categories.forEach(item => {
        item.addEventListener('mouseover', addActiveClass);
        item.addEventListener('mouseout', removeActiveClass);
    });

    home.addEventListener('mouseover', addActiveClass);
    home.addEventListener('mouseout', removeActiveClass);
    home.addEventListener('click', (e) => {
        handleCategoryClick(e, 'home');
    });
    return {addActiveClass, removeActiveClass}
})();

const addNewProjectHandler = (function() {
    const toDo = document.querySelectorAll('.category')[0];
    const project = document.querySelectorAll('.category')[1];
    const title = document.getElementById('form-title');
    const description = document.getElementById('form-description');
    const dueDate = document.getElementById('due-date');
    const dateInput = document.getElementById('form-date');
    const priority = document.querySelector('.priority');
    const container = document.querySelector('.container');

    function hideTodoElements() {
        title.placeholder = 'Project Name...';
        description.style.display = 'none';
        dueDate.style.display = 'none';
        dateInput.style.display = 'none';
        priority.style.display = 'none';
        project.classList.add('active');
        toDo.classList.remove('active');
        container.style.height = '40vh';
        container.style.width = '38vw';
        if(toDo.textContent[0] == '"')
            toDo.textContent = toDo.textContent.slice(1, -1);
    }
    project.addEventListener('click', hideTodoElements);

    function showTodoElements() {
        title.placeholder = 'Title...';
        description.style.display = 'inline-block';
        dueDate.style.display = 'block';
        dateInput.style.display = 'inline-flex';
        priority.style.display = 'flex';
        project.classList.remove('active');
        toDo.classList.add('active');
        if(toDo.textContent[0] != '"')
            toDo.textContent = `"${toDo.textContent}"`;
        container.style.height = '60vh';
        container.style.width = '50vw';
        if(project.textContent[0] == '"')
            project.textContent = project.textContent.slice(1, -1);
    }
    toDo.addEventListener('click', showTodoElements);

    return { showTodoElements };
})();

const newDialogOpenCloseEvents = (function(){
    const newDialogBox = document.querySelector('.new-dialog-box');
    document.querySelector('.newBtn').addEventListener('click', () => {
        newDialogBox.classList.remove('new-dialog-box-invisible');
        clearNewDialogBox();
    });
    document.getElementById('closeBtn').addEventListener('click', () => {
        newDialogBox.classList.add('new-dialog-box-invisible');
        addNewProjectHandler.showTodoElements();
        clearNewDialogBox();
    });

    document.getElementById('createBtn').addEventListener('click', getNewDetails);
})();

const detailsEventHandlers = (function(){
    document.getElementById('details-close-btn').addEventListener('click', () => {
        document.querySelector('.details-dialog-box').classList.add('details-dialog-box-invisible');
    });
})();

const priorityButtonHandler = (function() {
    const low = document.getElementById('low');
    const medium = document.getElementById('medium');
    const high = document.getElementById('high');
    const createBtn = document.getElementById('createBtn');

    low.addEventListener('click', () => {
        low.classList.add('low-hover');
        medium.classList.remove('medium-hover');
        high.classList.remove('high-hover');
        createBtn.dataset.priority = 0;
    });
    medium.addEventListener('click', () => {
        low.classList.remove('low-hover');
        medium.classList.add('medium-hover');
        high.classList.remove('high-hover');
        createBtn.dataset.priority = 1;
    });
    high.addEventListener('click', () => {
        low.classList.remove('low-hover');
        medium.classList.remove('medium-hover');
        high.classList.add('high-hover');
        createBtn.dataset.priority = 2;
    });
})();

function createCard(ToDo) {
    const card = document.createElement("div");
    const left = document.createElement("div");
    const right = document.createElement("div");
    const status = document.createElement("input");
    const title = document.createElement("h1");
    const details = document.createElement("button");
    const date = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    
    card.classList.add("card");
    left.classList.add("left");
    right.classList.add("right");
    status.classList.add("status");
    title.classList.add("title");
    details.classList.add("details", "outline-btn", "btn");
    date.classList.add("date");
    editBtn.classList.add("editBtn", "btn");
    deleteBtn.classList.add("deleteBtn", "btn");

    status.setAttribute('type', 'checkbox');
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`;
    deleteBtn.type = 'button';
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /></svg>`;
    editBtn.type = 'button';
    title.textContent = ToDo.title;
    details.textContent = 'Details';
    details.type = 'button';
    date.textContent = ToDo.dueDate;
    if(ToDo.status){
        status.checked = true;
        card.style.opacity = '0.5';
        card.style.textDecoration = 'line-through';
        card.style.filter = 'grayscale(1)';
        details.disabled = true;
        editBtn.disabled = true;
    }
    if(ToDo.priority == 0)
        card.classList.add('priority-low');
    else if(ToDo.priority == 1)
        card.classList.add('priority-medium');
    else if(ToDo.priority == 2)
        card.classList.add('priority-high');

    details.addEventListener('click', () => {
        loadDetailsDialog(ToDo.id);
    });

    editBtn.addEventListener('click', () => {
        document.querySelector('.new-dialog-box').classList.remove('new-dialog-box-invisible');
        editTodoDetails(ToDo.id);
    });

    deleteBtn.addEventListener('click', () => {
        deleteTodo(ToDo.id);
        deleteId(ToDo.id);
        loadHomeCards();
        loadProjectsCategory();
    });

    status.addEventListener('click', () => {
        if(status.checked == true){
            changeTodoStatus(ToDo.id, true);
            card.style.opacity = '0.5';
            card.style.textDecoration = 'line-through';
            card.style.filter = 'grayscale(1)';
            details.disabled = true;
            editBtn.disabled = true;
        }
        else {
            changeTodoStatus(ToDo.id, false);
            card.style.opacity = '1';
            card.style.textDecoration = 'none';
            card.style.filter = 'none';
            details.disabled = false;
            editBtn.disabled = false;
        }
    })

    left.append(status, title);
    right.append(details, date, editBtn, deleteBtn);
    card.append(left, right);

    return card;
}

function loadHomeCards() {
    const content = document.querySelector('.content');
    if(content != null)
        content.textContent = '';
    for(let i = 0; i<getTodoCount(); i++){
        if(readTodo(i) != undefined)
            content.appendChild( createCard( readTodo(i) ) );
    }

    document.querySelectorAll('.projects').forEach(item => {
        if(item.classList.contains('active')){
            item.classList.remove('active');
            item.innerText = item.innerText.slice(1, -1);
        }
    });
    document.getElementById('projects-heading').dataset.currentProject = 'home';
    const home = document.getElementById('home');
    if(home.classList.contains('active') == false){
        home.classList.add('active');
        home.textContent = `"${home.textContent}"`;
    }
}

function createProjectCategory(name) {
    const projects = document.createElement("li");

    projects.classList.add('projects');

    projects.innerText = name;
    projects.dataset.name = name;

    projects.addEventListener('mouseover', addCategoryHover.addActiveClass);
    projects.addEventListener('mouseout', addCategoryHover.removeActiveClass);
    projects.addEventListener('click', (e) => {
        handleCategoryClick(e, name);
    });

    return projects;
}

function loadProjectsCategory() {
    const projectList = document.getElementById('projects-list');
    const projects = getProjectKeys();
    if(projectList != null)
        projectList.textContent = '';
    for(let i = 0; i<getProjectKeys().length; i++){
        projectList.appendChild( createProjectCategory( projects[i] ) );
    }
}

function loadProjectCards(name) {
    const projects = getProjects(name);
    const content = document.querySelector('.content');
    if(content != null)
        content.textContent = '';
    if(projects.length == 0){
        loadEmptyProject(name);
    }
    for(let i = 0; i<projects.length; i++){
        content.appendChild( createCard( readTodo( projects[i] ) ) );
    }
}

function createEmptyProject(name) {
    const emptyProject = document.createElement('div');
    const emptyHeading = document.createElement('h2');
    const emptyPara = document.createElement('p');
    const deleteProjectBtn = document.createElement('button');

    emptyProject.classList.add('empty-project');
    emptyHeading.id = 'empty-heading';
    emptyPara.id = 'empty-project';
    deleteProjectBtn.id = 'delete-project';
    deleteProjectBtn.classList.add("outline-btn", "btn");
    deleteProjectBtn.type = 'button';

    emptyHeading.innerText = "Empty Project!";
    emptyPara.innerText = "Create a new To-Do or delete the Project.";
    deleteProjectBtn.innerText = "Delete Project";

    emptyProject.append(emptyHeading, emptyPara, deleteProjectBtn);

    deleteProjectBtn.addEventListener('click', () => {
        deleteProject(name);
        loadHomeCards();
        loadProjectsCategory();
    })

    return emptyProject;
}

function loadEmptyProject(name){
    const content = document.querySelector('.content');
    if(content != null)
        content.textContent = '';
    content.appendChild( createEmptyProject( name ) );
}

function handleCategoryClick(e, name) {
    const project = e.target;
    const projectList = document.querySelectorAll('.projects');
    const home = document.getElementById('home');

    const projectHeading = document.getElementById('projects-heading');
    projectHeading.dataset.currentProject = name;

    projectList.forEach(item => {
        if(item.classList.contains('active')){
            item.classList.remove('active');
            if(item.dataset.name != name)
                item.innerText = item.innerText.slice(1, -1);
        }
    });
    if(name == 'home'){
        home.classList.add('active');
        loadHomeCards();
    }
    else {
        if(home.classList.contains('active')){
            home.classList.remove('active');
            home.innerText = home.innerText.slice(1, -1);
        }
        project.classList.add('active');
        loadProjectCards(name);
    }
}

function loadDetailsDialog(id) {
    document.querySelector('.details-dialog-box').classList.remove('details-dialog-box-invisible');

    const todo = readTodo(id);
    const detailsTitle = document.getElementById('details-title');
    const detailsDescription = document.getElementById('details-description');
    const detailsDate = document.getElementById('details-date');
    const detailsMain = document.querySelector('.details-container-main');

    detailsTitle.innerText = todo.title;
    detailsDescription.innerText = todo.description;
    detailsDate.innerText = todo.dueDate;

    if(todo.priority == 0)
        detailsMain.style.borderColor = 'green';
    else if(todo.priority == 1)
        detailsMain.style.borderColor = 'yellow';
    else if(todo.priority == 2)
        detailsMain.style.borderColor = 'red';
    
}

function editTodoDetails(id) {
    const toDo = readTodo(id);
    document.getElementById('new-dialog-heading').innerText = 'Edit To-Do';
    document.querySelectorAll('.category')[0].dataset.id = id;
    document.querySelectorAll('.category')[1].style.display = 'none';
    document.getElementById('form-title').value = toDo.title;
    document.getElementById('form-description').value = toDo.description;
    document.getElementById('createBtn').innerText = 'Update';

    document.getElementById('form-date').value = format( parse(toDo.dueDate, 'dd / MM / yyyy', new Date()), 'yyyy-MM-dd');
    if(toDo.priority == 0){
        document.getElementById('low').classList.add('low-hover');
        createBtn.dataset.priority = 0;
    }
    else if(toDo.priority == 1){
        document.getElementById('medium').classList.add('medium-hover');
        createBtn.dataset.priority = 1;
    }
    else if(toDo.priority == 2){
        document.getElementById('high').classList.add('high-hover');
        createBtn.dataset.priority = 2;
    }
}

function getNewDetails() {
    let title =  document.getElementById('form-title').value;
    let description =  document.getElementById('form-description').value;
    let dueDate = new Date(document.getElementById('form-date').value);
    let priority = document.getElementById('createBtn').dataset.priority;
    const projectName = document.getElementById('projects-heading').dataset.currentProject;
    if(document.getElementById('form-title').placeholder[0] == 'T' && document.getElementById('new-dialog-heading').innerText[0] == 'C'){
        if(title != '' && description != '' && dueDate != '' && priority != undefined){
            let id = createTodo(title, description, dueDate, priority, false);
            if(projectName != 'home'){
                insertProject(projectName, id);
                loadProjectCards(projectName);
            }
            else
                loadHomeCards();
        }
    }
    else if(document.getElementById('form-title').placeholder[0] == 'P') {
        if(title != ''){
            newProject(title);
            addNewProjectHandler.showTodoElements();
            loadProjectsCategory();
            loadProjectCards(title);
            const projectList = document.querySelectorAll('.projects');
            
            document.getElementById('projects-heading').dataset.currentProject = title;
            
            projectList.forEach(item => {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                    item.innerText = item.innerText.slice(1, -1);
                }
                if(item.innerText == title){
                    item.classList.add('active');
                    item.textContent = `"${item.textContent}"`;
                }
            });
            const todo = document.querySelectorAll('.category')[0];
            if(todo.textContent[0] != '"')
                todo.textContent = `"${todo.textContent}"`;
            todo.classList.add('active');
            const home = document.getElementById('home');
            if(home.classList.contains('active')){
                home.classList.remove('active');
                home.innerText = home.innerText.slice(1, -1);
            }
        }
    }
    if(document.getElementById('new-dialog-heading').innerText[0] == 'E') {
        if(title != '' && description != '' && dueDate != '' && priority != undefined){
            let id = document.querySelectorAll('.category')[0].dataset.id;
            updateTodo(id, title, description, dueDate, priority);
            if(projectName != 'home'){
                loadProjectCards(projectName);
            }
            else
                loadHomeCards();
        }
    }
    clearNewDialogBox();
    document.querySelector('.new-dialog-box').classList.add('new-dialog-box-invisible');
}

function clearNewDialogBox() {
    document.getElementById('form-title').value = '';
    document.getElementById('form-description').value = '';
    document.getElementById('form-date').value = '';
    document.getElementById('low').classList.remove('low-hover');
    document.getElementById('medium').classList.remove('medium-hover');
    document.getElementById('high').classList.remove('high-hover');
    document.getElementById('createBtn').removeAttribute("data-priority");

    document.getElementById('new-dialog-heading').innerText = 'Create New ...';
    document.querySelectorAll('.category')[0].removeAttribute('data-id');
    document.querySelectorAll('.category')[1].style.display = 'block';
    
    document.getElementById('createBtn').innerText = 'Create';
}

export { loadHomeCards, loadProjectsCategory }