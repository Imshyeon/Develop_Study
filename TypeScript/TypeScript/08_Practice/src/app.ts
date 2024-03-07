const app = document.getElementById("app") as HTMLDivElement;

function printTemplate(hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const template = new constructor();
    const { projectInput, singleProject, projectList } = template;
    console.log(projectInput, singleProject, projectList);

    const projectInputEl = projectInput.content.cloneNode(
      true
    ) as DocumentFragment;
    const singleProjectEl = singleProject.content.cloneNode(
      true
    ) as DocumentFragment;
    const projectListEl = projectList.content.cloneNode(
      true
    ) as DocumentFragment;

    if (hookEl) {
      hookEl.appendChild(projectInputEl);
      hookEl.appendChild(singleProjectEl);
      hookEl.appendChild(projectListEl);
    }
  };
}

@printTemplate("app")
class indexTemplate {
  projectInput: HTMLTemplateElement;
  singleProject: HTMLTemplateElement;
  projectList: HTMLTemplateElement;

  constructor() {
    this.projectInput = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.singleProject = document.getElementById(
      "single-project"
    ) as HTMLTemplateElement;
    this.projectList = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
  }
}

const submitBtn = document.querySelector("form button");
submitBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const descEl = document.getElementById("description") as HTMLInputElement;
  const peopleEl = document.getElementById("people") as HTMLInputElement;

  const title = titleEl.value;
  const desc = descEl.value;
  const people = +peopleEl.value;

  const form = new FormSubmit(title, desc, people);
  if (!validationFn(form)) {
    throw new Error("잘못된 값이 입력되었습니다. 다시 시도해 주세요.");
  }
  printFormData(form);
});

function printFormData(form: FormSubmit) {
  console.log(form.title, form.desc, form.people);
  const liElement = document.querySelector("li") as HTMLLIElement;
  liElement.textContent = `${form.title} - ${form.desc} - ${form.people}`;

  const projectsEl = document.querySelector(".projects");
  const title = projectsEl?.querySelector("header h2") as HTMLHeadElement;
  title.textContent = form.title;
  const ulElement = projectsEl?.querySelector("ul") as HTMLUListElement;
  const listElement = document.createElement("li") as HTMLLIElement;
  listElement.textContent = `${form.desc} - ${form.people}`;
  ulElement.append(listElement);
}

// ==== validation ====
interface ValidateConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}
const registeredValidators: ValidateConfig = {};

function isRequired(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function isString(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      "string",
    ],
  };
}

function isNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      "positive",
    ],
  };
}

function validationFn(createdForm: any) {
  const validateConfig = registeredValidators[createdForm.constructor.name];
  if (!validateConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in validateConfig) {
    console.log(createdForm[prop]);
    for (const validator of validateConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!createdForm[prop];
          break;
        case "positive":
          isValid = isValid && createdForm[prop] > 0;
          break;
        case "string":
          isValid = isValid && typeof createdForm[prop] === "string";
          break;
      }
    }
  }
  return isValid;
}
// ==== validation ====

class FormSubmit {
  @isString
  @isRequired
  title: string;

  @isString
  @isRequired
  desc: string;

  @isNumber
  @isRequired
  people: number;

  constructor(title: string, desc: string, people: number) {
    this.title = title;
    this.desc = desc;
    this.people = people;
  }
}
