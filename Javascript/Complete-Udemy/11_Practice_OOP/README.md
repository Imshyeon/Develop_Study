# Practice: Object-Oriented Programming
[📌]()<br>
<br>

## 📌 Demo -1
```javascript
class Tooptip {}

class ProjectItem {
  constructor(id, updateProjectListsFunction) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }

  connectMoreInfoButton() {}

  connectSwitchButton() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn.addEventListener("click",this.updateProjectListsHandler);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject() {
    console.log(this);
  }

  switchProject(projectId) {
    // 방법 1
    // const projectIdx = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIdx, 1);

    // 방법 2
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
    // 해당 함수가 참인 값을 리턴. 따라서 p.id가 projectId와 일치하지 않는 애들이 다시 this.projects에 저장
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    // bind(finishedProjectList) : activeProjectList의 setSwitchHandlerFunction을 통해 switchHandler 동작.
    // 이때, switchHandler(this.projects...)의 this를 변경할 필요가 있다.
    finishedProjectList.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
```

