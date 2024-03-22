import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = []; // 외부에선 선언이 불가하나 상속 받으면 사용가능.
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListerers();
    }
    moveProject(projectId, newState) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newState) {
            // 불필요한 재렌더링 X
            project.status = newState;
            this.updateListerers();
        }
    }
    updateListerers() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // slice : 원본 대신 사본을 통해서 동작.
        }
    }
}
export const projectState = ProjectState.getInstance(); // 앱 전체에서 하나의 타입으로 된 객체만 갖게 될 것이다.
