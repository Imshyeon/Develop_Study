# React Practice | 프로젝트 관리 앱

[📌 스스로 만들어보기](#-스스로-만들어보기)<br>
[📌 강사 코드](#-강사-코드)<br>
<br>

## 📌 스스로 만들어보기

### 📖 동작

1. (아무런 프로젝트가 없었을 때) 사이드바의 Add Project나 홈의 Create new project 버튼이 나온다.
2. 해당 버튼을 누르면 TITLE, DESCRIPTION, DUE DATE(calendar)를 입력할 수 있고 Cancel과 Save 버튼을 통해서 입력을 취소할 수도, 저장할 수도 있다.
3. 프로젝트를 입력했다면, 홈화면과 사이드 바에 해당 내용을 출력한다.
4. 사이드바를 통해서 해당 프로젝트에 접속 &rarr; 홈화면에서 타이틀과 설명, 기한을 표시한다.
5. 해당 프로젝트를 진행하기 위한 Tasks들을 표시. &rarr; 입력할 수 있는 input과 Add Task버튼을 통해서 해야할 일을 추가할 수 있고, 완료(Clear)도 가능하다.

![동작](./src/assets/readme/동작_figma.png)

<br>

### 📖 디자인 설계

🔗 [디자인 설계 링크 | Figma](https://www.figma.com/file/MGt7yF2K36JISS4ejQI0mp/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B4%80%EB%A6%AC-%EC%95%B1?type=design&node-id=0%3A1&mode=design&t=0gxvwboR6l3gwGfG-1)
![figma design](./src/assets/readme/프로젝트관리앱_figma.png)

<br>

### 📖 완성

![완성](./src/assets/readme/완성.gif)

🔗 [레파지토리에서 코드 보기](https://github.com/Imshyeon/Develop_Study/tree/76f42affc2a437240623e68cc1fe1160e98d1579/React/Complete-React/9_React-Practice)

<br>

## 📌 강사 코드

### 📖 ProjectSidebar 컴포넌트 추가히기

#### App.jsx

```jsx
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  return (
    <main>
      <ProjectSidebar />
    </main>
  );
}
export default App;
```

#### ProjectSidebar.jsx

```jsx
export default function ProjectSidebar() {
  return (
    <aside>
      <h2>Your Projects</h2>
      <div>
        <button>+ Add Project</button>
      </div>
      <ul>...</ul>
    </aside>
  );
}
```

<br>

### 📖 Tailwind CSS로 사이드바 & 버튼 스타일링하기

```jsx
// App.jsx
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
    return (
        // h-screen : 화면 세로 길이를 전부 차지
        <main className="h-screen my-8">
            <ProjectSidebar/>
        </main>
    )
}
export default App;

// ProjectSidebar.jsx
export default function ProjectSidebar() {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
          + Add Project
        </button>
      </div>
      <ul>...</ul>
    </aside>
  );
}
```

<br>

### 📖 NewProject 컴포넌트와 재사용 가능한 Input 컴포넌트 추가하기

#### NewProject.jsx

```jsx
import Input from "./Input";
export default function NewProject() {
  return (
    <div>
      <menu>
        <li>
          <button>Cancle</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <Input label="Title" />
        <Input label="Description" textarea />
        <Input label="Due Date" />
      </div>
    </div>
  );
}
```

#### Input.jsx

```jsx
export default function Input({ label, textarea, ...props }) {
  return (
    <p>
      <label htmlFor={label}>{label}</label>
      {textarea ? (
        <textarea id={label} {...props} />
      ) : (
        <input id={label} {...props} />
      )}
    </p>
  );
}
```

#### App.jsx

```jsx
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";

function App() {
  return (
    // h-screen : 화면 세로 길이를 전부 차지
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar />
      <NewProject />
    </main>
  );
}
export default App;
```

#### 결과

![결과1](./src/assets/readme/1.png)

<br>

### 📖 Tailwind CSS로 버튼과 입력 항목 스타일링

```jsx
// NewProject.jsx
import Input from "./Input";
export default function NewProject() {
    return (
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">Cancle</button>
          </li>
          <li>
            <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
          </li>
        </menu>
        <div>
          <Input label="Title"/>
          <Input label="Description" textarea/>
          <Input label="Due Date"/>
        </div>
      </div>
    );
}

// Input.jsx
export default function Input({ label, textarea, ...props }) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        className="text-sm font-bold uppercase text-stone-500"
        htmlFor={label}
      >
        {label}
      </label>
      {textarea ? (
        <textarea className={classes} id={label} {...props} />
      ) : (
        <input className={classes} id={label} {...props} />
      )}
    </p>
  );
}
```

- `focus:outline-none focus:border-stone-600` : 입력하려고 눌렀을 때 기존의 outline은 지우고 대신 border color 변경
- 위의 방법처럼 기존의 아웃라인을 지우고 싶었으나 빨리 프로젝트를 끝내고 싶어서 추가하진 못했다..ㅎㅎ..

<br>

### 📖 JSX와 Tailwind CSS 스타일을 위한 컴포넌트 분리 (재사용 가능성 향상)

#### Button.jsx
```jsx
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
    >
      {children}
    </button>
  );
}
```

#### NoProjectSelected.jsx

```jsx
import noProjectImage from '../assets/no-projects.png'
import Button from './Button'

export default function NoProjectSelected() {
    return <div className='mt-24 text-center w-2/3'>
        <img src={noProjectImage} alt="An empty task list" className='w-16 h-16 object-contain mx-auto' />
        <h2 className='text-xl font-bold text-stone-500 my-4'>No Project Seleted.</h2>
        <p className='text-stone-400 mb-4'>Select a project or get started with a new one.</p>
        <p className='mt-8'><Button>Create new project</Button></p>
    </div>
}
```

#### ProjectSidebar.jsx
```jsx
import Button from "./Button";
export default function ProjectSidebar() {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button>+ Add Project</Button> {/* Button 대체 */}
      </div>
      <ul>...</ul>
    </aside>
  );
}
```

<br>

### 📖 컴포넌트 간 교환을 위한 State 관리법

#### App.jsx

```jsx
import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // 아무것도 안하고 있다. 라는 신호
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, // 우리가 새로운 프로젝트를 추가한다는 신호
      };
    });
  }

  let content;
  if (projectsState.selectedProjectId === null) {
    // 새로운 프로젝트를 추가한다는 버튼을 누르면
    content = <NewProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    // h-screen : 화면 세로 길이를 전부 차지
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}
export default App;
```

- 강사는 새로운 프로젝트를 넣을 것인지 아닌지에 대한 신호와 프로젝트 배열을 관리하는 State를 설정했다.
> 나는 프로젝트와 관련된 신호를 따로 넣진 않았다. 강사 코드를 보면서 해당 신호(signal)을 주고 받는다면 로직을 짜고 코드를 작성하는데 더 편하게 할 수 있을 것이란 것을 깨달았다!!
> 🚨 앞으로 신호를 주고받아서 상태를 업데이트하는 방법에 대해서도 생각해보자! 🚨

#### ProjectSidebar.jsx, NoProjectSelected.jsx

```jsx
// ProjectSidebar.jsx
import Button from "./Button";
export default function ProjectSidebar({onStartAddProject}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul>...</ul>
    </aside>
  );
}

// NoProjectSelected.jsx
import noProjectImage from '../assets/no-projects.png'
import Button from './Button'

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Seleted.
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one.
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
```
- 강사는 앞서 버튼에 대한 커스텀 컴포넌트를 작성했고, `chilren`외에도 다른 속성들이 넘어올 것을 대비해 `...props`를 추가했다.
- 이렇게 함으로써 `onClick` 동작이 간단하게 진행된 것 같다.
> 앞으로 `...props`에 대한 적극적인 활용을 해보자! 솔직히 해당 속성을 사용하려고 생각해보긴 했지만 어떻게 써야할지 감이 안와서 쓰지 못했다..!

<br>

### 📖 Refs(참조)와 전달된 Refs(참조)로 사용자 입력 받아오기

