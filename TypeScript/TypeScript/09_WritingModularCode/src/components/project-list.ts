/// <reference path="base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>

namespace App {
  // ProjectList Class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = []; // 초기화
      this.configures();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        // 드래그 이벤트에 첨부된 데이터가 text/plain 형식인지 검사
        event.preventDefault(); // 기본값은 드래그를 허용하지 않음. -> 드래그를 허용한다!

        // drag를 했을 때 droppable 클래스를 추가하여 CSS 적용 -> 드래그 가능한 대상을 표현
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      // drag를 했을 때 범위에서 벗어나는 대상에서 droppable 클래스를 제거.
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    @autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer?.getData("text/plain")!;
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    configures() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        console.log(projects);
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          } else {
            return prj.status === ProjectStatus.Finished;
          }
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = ""; // 아예 초기화 해서 추가할 때마다 표현하는 방식
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }
  }
}
