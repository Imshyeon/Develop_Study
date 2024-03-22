var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "./base-component.js";
import { ProjectStatus } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
// ProjectList Class
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = []; // 초기화
        this.configures();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            // 드래그 이벤트에 첨부된 데이터가 text/plain 형식인지 검사
            event.preventDefault(); // 기본값은 드래그를 허용하지 않음. -> 드래그를 허용한다!
            // drag를 했을 때 droppable 클래스를 추가하여 CSS 적용 -> 드래그 가능한 대상을 표현
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dragLeaveHandler(_) {
        // drag를 했을 때 범위에서 벗어나는 대상에서 droppable 클래스를 제거.
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    dropHandler(event) {
        var _a;
        const prjId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    configures() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener((projects) => {
            console.log(projects);
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                else {
                    return prj.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = ""; // 아예 초기화 해서 추가할 때마다 표현하는 방식
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
