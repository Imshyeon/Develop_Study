export default function Sidebar({ onClick, projects, goToProjectHandler }) {
  return (
    <section className="max-md:hidden w-64 grow-0 h-screen bg-sidebar">
      <div
        id="add-project"
        className="flex flex-col justify-center items-center mt-8"
      >
        <button
          onClick={onClick}
          className="rounded bg-sidebarButton p-2 w-48 mt-5 hover:bg-neutral-300"
        >
          ADD PROJECT
        </button>
        <div className="bg-sidebarLine w-48 h-[1px] mt-10"></div>
      </div>
      <div>
        {projects.map((prj) => {
          return (
            <div key={prj.title}>
              <button onClick={goToProjectHandler} name={prj.title}>
                {prj.title}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
