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

// Project State Management
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
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

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = []; // 초기화

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); // 위에서 한 cloneNode와 비슷..
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${type}-projects`;

    projectState.addListener((projects: any[]) => {
      console.log(projects);
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); // 위에서 한 cloneNode와 비슷..
    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

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

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
