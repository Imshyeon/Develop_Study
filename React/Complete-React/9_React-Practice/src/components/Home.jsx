import { useRef } from "react";
import noPrjImage from "../assets/no-projects.png";

export default function Home({
  onClick,
  onChange,
  onDelete,
  projects,
  destination,
  curProject,
}) {
  const task = useRef();

  const noProjects = (
    <div>
      <img src={noPrjImage} alt="when there is any single project." />
      <button onClick={onClick}>Create new project</button>
    </div>
  );

  const prjPresents = projects.length > 0;

  let project = printHomePages(curProject);

  function printHomePages(project) {
    return (
      <div>
        <div>
          <h1>{project.title}</h1>
          <span>{project.dueDate}</span>
          <p>{project.description}</p>
        </div>
        <div>----</div>
        <div>
          <h1>📍 Tasks</h1>
          <input type="text" ref={task} required />
          <button onClick={() => onChange(task, project.title)}>
            Add Task
          </button>
          <ul>
            {project.tasks.length > 0 &&
              project.tasks.map((task) => {
                return (
                  <div>
                    <li key={task}>{task}</li>
                    <button
                      key={task + "-clear"}
                      onClick={() => onDelete(task, project.title)}
                    >
                      Clear
                    </button>
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }

  if (destination) {
    projects.map((prj) => {
      if (prj.title === destination) {
        project = printHomePages(prj);
        return project;
      }
    });
  }

  return (
    <section>
      {!prjPresents && noProjects}
      {prjPresents && project}
    </section>
  );
}
