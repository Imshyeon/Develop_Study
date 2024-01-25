export default function Sidebar({ onClick, projects, goToProjectHandler }) {
  return (
    <section className="max-md:hidden w-64 grow-0 h-screen bg-sidebar p-2">
      <div
        id="add-project"
        className="flex flex-col justify-center items-center mt-8"
      >
        <button
          onClick={onClick}
          className="rounded bg-sidebarButton p-2 mt-5 w-48 hover:bg-neutral-300"
        >
          ADD PROJECT
        </button>
        <div className="bg-sidebarLine w-full h-[1px] mt-10 mb-5 mx-2"></div>
      </div>
      <div>
        {projects.map((prj) => {
          return (
            <div
              key={prj.title}
              className="flex flex-col justify-center items-center"
            >
              <button
                onClick={goToProjectHandler}
                name={prj.title}
                className="rounded hover:bg-sidebarTitleButton p-2 w-48 mt-5"
              >
                {prj.title}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
