import './style.css';
import { createTodo} from './todo'
import { newProject, insertProject} from './projects'
import { loadHomeCards, loadProjectsCategory } from './dom';

if(localStorage.getItem('toDoList') == null){
    createTodo('Do Cardio', 'Do Cardio at gym or walk.', new Date(2023, 11, 24), 1, true);
    createTodo('Go to Gym', 'Go to gym on time at 7:30PM.', new Date(2024, 0, 1), 2, false);
    createTodo('Start studying for End-Sems', 'Start preparations for end-sems.', new Date(2023, 11, 28), 0, false);
    createTodo("Complete Assignment of 'Design & Analysis of Algoright'", 'Complete last 2 year End-Sems paer.', new Date(2023, 11, 24), 1, true);
    createTodo('Learn React JS', 'Finish JavaScript and learn React ASAP', new Date(2024, 0, 30), 2, false);
    createTodo('Finish JavaScript', 'Learn Asynchronous Code\nAPIs\nAsync and Await.', new Date(2023, 11, 26), 1, false);

    newProject('Gym');
    newProject('Study');
    newProject('Work');
    insertProject('Gym', [0, 1]);
    insertProject('Study', [2, 3]);
    insertProject('Work', [4, 5]);
}

loadHomeCards();
loadProjectsCategory();