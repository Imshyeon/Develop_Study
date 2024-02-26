# TypeScript 컴파일러

[📌 컴파일러 사용하기](#-컴파일러-사용하기)<br>
<br>

## 📌 컴파일러 사용하기

### 📖 관찰(watch)모드 사용하기

- 그동안 파일에서 뭔가 수정하고 반영하려면 `tsc '파일이름'` 명령어를 추가해야했다.
- 이제 `tsc '파일 이름' --watch` (혹은 `-w`)를 사용하면 관찰모드가 되고 파일에서 무언가 변경되고 저장되면 자동으로 다시 컴파일 된다.

<br>

### 📖 전체 프로젝트(다수의 파일) 컴파일

- 타입스크립트에서 파일이 여러개라면 `tsc`라고만 명령어를 사용하면 전체 프로젝트를 관찰모드로 컴파일 하게 된다. (`tsc -w`로 사용할 수 있다.)
- `tsc --init`을 사용해서 실행하는 방법도 있다. &rarr; 이 명령은 타입스크립트 프로젝트로 초기화하고 싶은 프로젝트에서 한번만 실행해도 된다.
  - 즉, 타입스크립트에게 이 명령을 실행하는 폴더에 있는 모든 것에 대해 실행하라 라는 의미.

<br>

### 📖 파일 포함 및 제외하기

#### 💎 tsconfig.json

1. `compilerOptions` : 컴파일러의 작동 방식을 구성할 수 있다.
2. `exclude` : 컴파일에 포함되지 않아야 하는 파일을 입력한다.
3. `include` : 컴파일에 포함할 파일을 타입스크립트에 구체적으로 지정한다.
4. `files` : 구체적인 파일을 가리킨다. `include`와 비슷하지만 `include`에서는 포함시키고 싶은 폴더 전체를 지정하지만 이 옵션은 컴파일하려는 개별 파일만 지정할 수 있다.

```json
{
  "compilerOptions": {},
  "exclude": ["analytics.ts", "**/*.dev.ts", "node_modules"], // 만약 exclude 옵션을 설정하지 않으면 node_modules는 자동으로 제외되어 컴파일된다!
  "include": ["app.ts"],
  "files": ["app.ts"]
}
```

<br>

### 📖 compilerOptions 살펴보기

#### 💎 tsconfig.json

1. `compilerOptions.target`: 어떤 target 자바스크립트 버전으로 코드를 컴파일할지 설정. &rarr; `target`을 설정함으로써, 컴파일된 코드를 지원하는 브라우저를 정의한다.
2. `lib` : 타입스크립트의 객체 및 기능 기본값을 지정할 수 있는 옵션(ex. DOM API) &rarr; 따로 설정되어있지 않으면 기본값이 사용된다.
3. `allowJs` : 컴파일에 자바스크립트 파일을 포함시킬 수 있다. 이 옵션을 사용하면 자바스크립트 파일을 타입스크립트가 컴파일한다.
4. `checkJs` : 자바스크립트 파일을 컴파일하지는 않지만 구문을 검사하고 잠재적 오류를 보고한다.
5. `jsx` : reactJS에 도움이 되는 옵션.
6. `sourceMap` : 디버깅과 개발에 도움이 된다. 코드가 복잡하고 컴파일된 자바스크립트 코드가 아니라 타입스크립트 코드를 디버깅하고 싶을 때 사용한다. &rarr; 모던 브라우저와 개발자 도구에서 자바스크립트 파일을 입력 파일에 연결하는 다리 역할을 하고 개발자 도구(Sources탭)에서 타입스크립트 파일을 볼 수 있고, 중단점을 활용할 수 있다.
7. `outDir` : 타입스크립트 컴파일러에게 생성된 파일(js)을 어디에 저장해야하는지 알려준다.
8. `rootDir` : 파일이 저장된 폴더를 구체적으로 설정할 수 있다. 타입스크립트 컴파일럴가 다른 폴더에서 찾지 않게 할 수 있다.
9. `removeComments` : 컴파일할 때, 타입스크립트 파일에 있는 모든 주석이 제거되고 컴파일된 자바스크립트 파일만 남는다.
10. `noEmit` : 컴파일러가 파일을 검사하고, 출력을 실제로 만들지 않고도 잠재적인 오류를 보고할 수 있다.
11. `downlevelIteration` : 타입스크립트에서 for문이 안되는 오류가 발생할 수 있다. 이때, 이 옵션을 키면 더 정확히 컴파일이 된다. 하지만 항상 이 옵션을 키는 것은 좋지 않다. 장황한 코드가 출력될 수 있기 때문.
12. `noEmitOnError` : 기본값은 거짓. 오류가 생기더라도 타입스크립트는 자바스크립트를 만든다. 만약 이 옵션 값을 true로 설정한다면, 문제가 있는 파일은 생성되지 않는다.
13. `strict`

- `strict` : true로 하면, 모든 strict 타입 검사 옵션이 활성화 된다.
- `noImplicitAny` : 매개변수, 즉, 코드에서 작업 중인 값에 대해 명확히 해준다.
- `strictNullChecks` : 잠재적으로 null이 될 수 있는 값에 접근하고 작업할 때 엄격하게 검사한다.
- `strictFunctionTypes` : 함수 타입과 관련 되어있다. 매개변수와 반환값과 관련하여 함수가 어떻게 생겼는지 정의하고 함수 타입을 만든다.
- `strictBindCallApply` : bind, 호출, 적용 작업을 하는 경우 유용할 수 있다. bind, call, apply 함수가 호출되면 설정한 내용이 타당한지 확인한다.
- `strictPropertyInitialization` : 클래스로 작업 시 중요
- `noImplicitThis` : 무엇을 참조하는지 분명하지 않은 곳에서 this 키워드를 사용한다면 타입스크립트가 경고를 표시
- `alwaysStrict` : 생성되는 자바스크립트 파일이 strict 모드를 사용하도록 제어.

14. `noUnusedLocals` : 로컬 변수에서 사용하지 않은 변수에 대해서 오류(경고)를 제공.
15. `noUnusedParameters` : 사용하지 않는 매개변수에 대해서 오류(경고)를 제공.
16. `noImplicitReturns` : 어떤 함수가 무언가를 반환하고 반환하지 않는 경우가 있다. 이 옵션은 아무것도 반환하지 않아도 return 키워드를 쓰도록 한다.

<br><br>

🔗 [tsconfig.json 자세히 알아보기](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)<br>
🔗 [컴파일러 구성 문서](https://www.typescriptlang.org/docs/handbook/compiler-options.html)<br>
