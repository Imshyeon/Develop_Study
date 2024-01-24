import noPrjImage from "../assets/no-projects.png";

export default function Home({ projects, onClick, destination, curProject }) {
  const noProjects = (
    <div>
      <img src={noPrjImage} alt="when there is any single project." />
      <button onClick={onClick}>Create new project</button>
    </div>
  );

  const prjPresents = projects.length > 0;

  let project = (
    <div>
      <div>
        <h1>{curProject.title}</h1>
        <span>{curProject.dueDate}</span>
        <p>{curProject.description}</p>
      </div>
      <div>----</div>
      <div>
        <h1>📍 Tasks</h1>
        <input type="text" required />
        <button>Add Task</button>
        <ul></ul>
      </div>
    </div>
  );

  if (destination) {
    projects.map((prj) => {
      if (prj.title === destination) {
        project = (
          <div>
            <div>
              <h1>{prj.title}</h1>
              <span>{prj.dueDate}</span>
              <p>{prj.description}</p>
            </div>
            <div>----</div>
            <div>
              <h1>📍 Tasks</h1>
              <input type="text" required />
              <button>Add Task</button>
              <ul></ul>
            </div>
          </div>
        );
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
