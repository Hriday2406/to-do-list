let Projects = {};

let newProject = (name) => {
    if(getProjects(name) == undefined)
        Projects[`${name}`] = [];
    storeProject();
}

let insertProject = (name, ids) => {
    if(typeof ids == 'number')
        Projects[name].push(ids);
    else
        ids.forEach(id => {
            Projects[name].push(id);
        });
    storeProject();
}

let deleteProject = (name) => {
    delete Projects[`${name}`];
    storeProject();
}

let deleteId = (id) => {
    for (let key in Projects){
        let project = Projects[key]
        if(project.includes(id)){
            let index = project.indexOf(id);
            project.splice(index, 1);
        }
    }
    storeProject();
}

let getProjects = (name) => {
    // getProject();
    return Projects[name];
}

let getProjectKeys = () => {
    getProject();
    return Object.keys(Projects);
}

function storeProject() {
    localStorage.setItem('projects', JSON.stringify(Projects));
}


function getProject() {
    Projects = JSON.parse(localStorage.getItem('projects'));
}

export { newProject, insertProject, deleteProject, deleteId, getProjects, getProjectKeys }