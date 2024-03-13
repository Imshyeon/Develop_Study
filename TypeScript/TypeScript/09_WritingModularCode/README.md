# 모듈 및 네임스페이스

[📌 개요](#-개요)<br>
[📌 네임스페이스](#-네임스페이스)<br>
<br>

## 📌 개요

1. 네임스페이스와 파일 번들링

- 네임스페이스 : 구문 기능을 제공할 수 있는 타입
  - 기본적으로 네임스페이스 아래에 코드를 그룹으로 묶은 다음, 다른 파일에 네임스페이스를 임포트해서 파일마다 네임스페이스를 사용
- 파일 번들링 : 여러 파일을 하나의 파일로 묶어서 컴파일 처리한 여러 파일에 코드를 작성.
  - 파일마다 임포트되어 관리해야 하는 임포트 개수가 줄어들어 HTML 파일 하나로 다양한 임포트를 수동 관리할 필요가 없다.

2. ES6 imports/exports

- 모던 자바스크립트는 대규모 프로젝트를 묶는데에 솔루션을 가지고 있다.
- 대신, 스크립트 임포트 하나는 꼭 필요하다.

<br>

## 📌 네임스페이스

### 📖 네임스페이스 작업하기

#### 💎 drag-drop-interfaces.ts

```ts
// Drag & Drop Interfaces
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
} // 바닐라 자바스크립트에 컴파일 되지 않는다. 타입 스크립트의 기능 중 하나.
```

- 네임스페이스에 클래스, 상수 등 원하는대로 넣을 수 있는 것은 맞다. 따라서 기본적으로 갖고있는 코드가 뭐든 네임스페이스를 씌울 수 있다.
- `export` 키워드를 인터페이스 앞에 추가하여 네임스페이스에서 기능을 내보내도록 한다.

#### 💎 app.ts

```ts
/// <reference path="drag-dro

namespace App {
  // Project Type
  enum ProjectStatus {
    Active,
    Finished,
  }

  class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }

  // Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = []; // 외부에선 선언이 불가하나 상속 받으면 사용가능.

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListerers();
    }

    moveProject(projectId: string, newState: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newState) {
        // 불필요한 재렌더링 X
        project.status = newState;
        this.updateListerers();
      }
    }

    private updateListerers() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice()); // slice : 원본 대신 사본을 통해서 동작.
      }
    }
  }

  const projectState = ProjectState.getInstance(); // 앱 전체에서 하나의 타입으로 된 객체만 갖게 될 것이다.

  // Validation
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    console.log(isValid, validatableInput);
    return isValid;
  }

  // autobind decorator
  function autobind(_: any, _2: string, desciptor: PropertyDescriptor) {
    const originalMethod = desciptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

  // Componenet Base Class
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostId)! as T;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configures?(): void;
    abstract renderContent(): void;
  }

  // ProjectItem Class
  class ProjectItem
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
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }

  // ProjectList Class
  class ProjectList
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

  // ProjectInput Class
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configures();
    }

    configures() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | undefined {
      const enteredTitle = this.titleInputElement.value;
      const enteredDesciption = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const desciptionValidatable: Validatable = {
        value: enteredDesciption,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(desciptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("데이터를 입력해 주세요.");
        return;
      } else {
        return [enteredTitle, enteredDesciption, +enteredPeople];
      }
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        // 타입스크립트엣헌 튜플이나 자바스크립트에선 튜플이 없으므로 Array
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInput();
      }
    }

    private clearInput() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  }

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
```

- `///` 를 이용하여 네임스페이스를 import &rarr; App app.ts에서 사용할 수 있게 된다.

<br>

#### 💎 project-model.ts

```ts
namespace App {
  // Project Type
  export enum ProjectStatus {
    Active,
    Finished,
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
```

#### 💎 tsconfig.json

- `outFile`로 타입스크립트에게 네임스페이슬르 사슬처럼 이어주라고 명령 &rarr; 참조한 내용이 컴파일할 때 여러 개의 자바스크립트 파일이 아니라 단일 자바스크립트 파일로 컴파일이 된다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "amd",
    "outFile": "./dist/bundle.js"
  }
}
```

#### 💎 bundle.js 적용하기

- 기존에 dist 폴더 안에 있던 js 파일을 모두 삭제
- `tsc -w`를 다시 실행함으로써 bundle.js 생성
- index.html의 script src를 bundle.js로 설정

<br>

### 📖 파일 및 폴더 정리하기

#### 💎 app.ts

```ts
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
```

🔗 [레파지토리에서 보기]()
