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

    if (
      enteredTitle.trim().length === 0 ||
      enteredDesciption.trim().length === 0 ||
      enteredTitle.trim().length === 0
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
      console.log(title, desc, people);
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
