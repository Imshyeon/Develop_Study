import Sidebar from "./components/Sidebar.jsx";
import CreatePrjModal from "./components/CreatePrjModal";
import Home from "./components/Home.jsx";

import { useRef, useState } from "react";

function App() {
  const [createPrj, setCreatePrjs] = useState({
    title: undefined,
    description: undefined,
    dueDate: undefined,
    tasks: [],
  });
  const [allProjects, setAllProjects] = useState([]);
  const [destination, setDestination] = useState();
  const dialog = useRef();
  

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
    setDestination(e.target.name)
  }

  return (
    <div className="flex">
      <Sidebar
        onClick={openModalHandler}
        projects={allProjects}
        goToProjectHandler={goToProjectHandler}
      />
      <Home onClick={openModalHandler} projects={allProjects} curProject={createPrj} destination={destination} />
      <CreatePrjModal ref={dialog} onSubmit={createProjectHandler} />
    </div>
  );
}

export default App;
