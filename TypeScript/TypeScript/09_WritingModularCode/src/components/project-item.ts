import { Draggable } from "../models/drag-drop.js";
import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configures();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    console.log(event);
    event.dataTransfer!.setData("text/plain", this.project.id); // drag 이벤트의 특수 속성 -> 이 속성을 이용해 DragEvent에 데이터를 첨부할 수 있다.
    event.dataTransfer!.effectAllowed = "move"; // 커서의 모양을 제어하는 역할
  }

  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }

  configures() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
