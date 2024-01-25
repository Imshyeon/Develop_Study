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
    <div className="flex flex-col justify-end items-center h-3/5">
      <img
        className="w-20 object-fit"
        src={noPrjImage}
        alt="when there is any single project."
      />
      <h1 className="text-4xl bold mt-3">추가된 프로젝트가 없습니다.</h1>
      <button className="p-1 rounded" onClick={onClick}>
        Create new project
      </button>
    </div>
  );

  const prjPresents = projects.length > 0;

  let project = printHomePages(curProject);

  function printHomePages(project) {
    return (
      <div className="flex flex-col justify-start mx-10 mt-16">
        <div className="">
          <h1 className="text-6xl font-bold tracking-wide inline">
            {project.title}
          </h1>
          <span className="font-semibold ml-2 align-baseline">
            {project.dueDate}
          </span>
          <p className="text-xl block leading-relaxed p-5">
            {project.description}
          </p>
        </div>
        <div className="bg-sidebarLine w-full h-[1px] my-5"></div>
        <div>
          <h1 className="text-4xl font-bold my-5 tracking-wide">📍 Tasks</h1>
          <input
            type="text"
            ref={task}
            required
            className="bg-homeInputColor w-3/4 h-12 rounded mr-5"
          />
          <button onClick={() => onChange(task, project.title)}>
            Add Task
          </button>
          <ul className="mt-5">
            {project.tasks.length > 0 &&
              project.tasks.map((task) => {
                return (
                  <div className="my-4 flex">
                    <li key={task} className="p-2 group/item w-3/4 rounded">
                      {task}
                      <button
                        key={task + "-clear"}
                        onClick={() => onDelete(task, project.title)}
                        className="rounded invisible group-hover/item:visible ml-5"
                      >
                        Clear
                      </button>
                    </li>
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
    <section className="w-full">
      {!prjPresents && noProjects}
      {prjPresents && project}
    </section>
  );
}
