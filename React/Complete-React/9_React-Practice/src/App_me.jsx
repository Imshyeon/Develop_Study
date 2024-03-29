import Sidebar from "./components_me/Sidebar.jsx";
import CreatePrjModal from "./components_me/CreatePrjModal.jsx";
import Home from "./components_me/Home.jsx";

import { useRef, useState } from "react";

function App() {
  const dialog = useRef();
  const [newTask, setNewTask] = useState();
  const [createPrj, setCreatePrjs] = useState({
    title: undefined,
    description: undefined,
    dueDate: undefined,
    tasks: [],
  });
  const [allProjects, setAllProjects] = useState([]);
  const [destination, setDestination] = useState();

  function openModalHandler() {
    dialog.current.open();
    console.log("clicked");
  }

  function createProjectHandler(prj) {
    setCreatePrjs(prj);
    setAllProjects((prevProjects) => {
      return [...prevProjects, prj];
    });
  }

  function goToProjectHandler(e) {
    setDestination(e.target.name);
  }
  
  function addTasksHandler(task, title) {
    allProjects.map((project) => {
      if (project.title === title) {
        project.tasks.push(task.current.value);
        setNewTask(() => {
          return {
            prjTitle: title,
            tasks: [task.current.value],
          };
        });
      }
    });
    task.current.value = '';
  }

  function deleteTaskHandler(task, title) {
    allProjects.map((project) => {
      if (project.title === title) {
        const filteredTasks = project.tasks.filter(target => target !== task)
        project.tasks = filteredTasks
        setNewTask(() => {
          return {
            prjTitle: title,
            tasks: project.tasks
          }
        })
      }
    })
  }

  return (
    <div className="flex">
      <Sidebar
        onClick={openModalHandler}
        projects={allProjects}
        goToProjectHandler={goToProjectHandler}
      />
      <Home
        onClick={openModalHandler}
        onChange={addTasksHandler}
        onDelete={deleteTaskHandler}
        projects={allProjects}
        curProject={createPrj}
        destination={destination}
      />
      <CreatePrjModal ref={dialog} onSubmit={createProjectHandler} />
    </div>
  );
}

export default App;
