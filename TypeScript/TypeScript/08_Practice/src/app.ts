// const app = document.getElementById("app") as HTMLDivElement;

// function printTemplate(hookId: string) {
//   return function (constructor: any) {
//     const hookEl = document.getElementById(hookId);
//     const template = new constructor();
//     const { projectInput, singleProject, projectList } = template;
//     console.log(projectInput, singleProject, projectList);

//     const projectInputEl = projectInput.content.cloneNode(
//       true
//     ) as DocumentFragment;
//     const singleProjectEl = singleProject.content.cloneNode(
//       true
//     ) as DocumentFragment;
//     const projectListEl = projectList.content.cloneNode(
//       true
//     ) as DocumentFragment;

//     if (hookEl) {
//       hookEl.appendChild(projectInputEl);
//       hookEl.appendChild(singleProjectEl);
//       hookEl.appendChild(projectListEl);
//     }
//   };
// }

// @printTemplate("app")
// class indexTemplate {
//   projectInput: HTMLTemplateElement;
//   singleProject: HTMLTemplateElement;
//   projectList: HTMLTemplateElement;

//   constructor() {
//     this.projectInput = document.getElementById(
//       "project-input"
//     ) as HTMLTemplateElement;
//     this.singleProject = document.getElementById(
//       "single-project"
//     ) as HTMLTemplateElement;
//     this.projectList = document.getElementById(
//       "project-list"
//     ) as HTMLTemplateElement;
//   }
// }

// const submitBtn = document.querySelector("form button");
// submitBtn?.addEventListener("click", (e) => {
//   e.preventDefault();
//   const titleEl = document.getElementById("title") as HTMLInputElement;
//   const descEl = document.getElementById("description") as HTMLInputElement;
//   const peopleEl = document.getElementById("people") as HTMLInputElement;

//   const title = titleEl.value;
//   const desc = descEl.value;
//   const people = +peopleEl.value;

//   const form = new FormSubmit(title, desc, people);
//   if (!validationFn(form)) {
//     throw new Error("잘못된 값이 입력되었습니다. 다시 시도해 주세요.");
//   }
//   printFormData(form);
// });

// function printFormData(form: FormSubmit) {
//   console.log(form.title, form.desc, form.people);
//   const liElement = document.querySelector("li") as HTMLLIElement;
//   liElement.textContent = `${form.title} - ${form.desc} - ${form.people}`;

//   const projectsEl = document.querySelector(".projects");
//   const title = projectsEl?.querySelector("header h2") as HTMLHeadElement;
//   title.textContent = form.title;
//   const ulElement = projectsEl?.querySelector("ul") as HTMLUListElement;
//   const listElement = document.createElement("li") as HTMLLIElement;
//   listElement.textContent = `${form.desc} - ${form.people}`;
//   ulElement.append(listElement);
// }

// // ==== validation ====
// interface ValidateConfig {
//   [property: string]: {
//     [validatableProp: string]: string[];
//   };
// }
// const registeredValidators: ValidateConfig = {};

// function isRequired(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: ["required"],
//   };
// }

// function isString(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: [
//       ...registeredValidators[target.constructor.name][propName],
//       "string",
//     ],
//   };
// }

// function isNumber(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: [
//       ...registeredValidators[target.constructor.name][propName],
//       "positive",
//     ],
//   };
// }

// function validationFn(createdForm: any) {
//   const validateConfig = registeredValidators[createdForm.constructor.name];
//   if (!validateConfig) {
//     return true;
//   }

//   let isValid = true;
//   for (const prop in validateConfig) {
//     console.log(createdForm[prop]);
//     for (const validator of validateConfig[prop]) {
//       switch (validator) {
//         case "required":
//           isValid = isValid && !!createdForm[prop];
//           break;
//         case "positive":
//           isValid = isValid && createdForm[prop] > 0;
//           break;
//         case "string":
//           isValid = isValid && typeof createdForm[prop] === "string";
//           break;
//       }
//     }
//   }
//   return isValid;
// }
// // ==== validation ====

// class FormSubmit {
//   @isString
//   @isRequired
//   title: string;

//   @isString
//   @isRequired
//   desc: string;

//   @isNumber
//   @isRequired
//   people: number;

//   constructor(title: string, desc: string, people: number) {
//     this.title = title;
//     this.desc = desc;
//     this.people = people;
//   }
// }

// ==== 강사 코드 ====

// Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void; // 드래그하는 대상이 유효한 드래그 타깃이라는 것을 브라우저와 자바스크립트에 알려줘야함. -> 드롭을 할 수 있게
  dropHandler(event: DragEvent): void; // 실제 드롭이 일어나면 반응하는 역할 -> 드롭에 대한 처리
  dragLeaveHandler(event: DragEvent): void; // 사용자가 드래그 했을 때 배경색을 바꾼다던지 시각적인 피드백 제공에 유용
}

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
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
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
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
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

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
