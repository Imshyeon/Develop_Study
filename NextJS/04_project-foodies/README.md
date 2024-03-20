# 프로젝트 : Foodies 앱

[📌 연습문제](#-연습문제)<br>
[📌 어플리케이션 구현하기](#-어플리케이션-구현하기)<br>
<br>

## 📌 연습문제

- 신규 라우트 3개 만들기 : '/meals', '/meals/share', '/community'

```js
// app/meals/page.js
export default function MealsPage() {
  return <h1>Meals Page</h1>;
}

// app/meals/share/page.js
export default function ShareMealPage() {
  return <h1>Share Page</h1>;
}

// app/community/page.js
export default function CommunityPage() {
  return <h1>Community</h1>;
}

// app/meals/[mealSlug]/page.js
export default function MealDetailPage({ params }) {
  return <h1>Meal Details {params.mealSlug}</h1>;
}
```

<br>

## 📌 어플리케이션 구현하기

### 📖 레이아웃 개념 다시보기

```js
// app/meals/layout.js
export default function MealsLayout({ children }) {
  return (
    <>
      <p>Meals Layout</p>
      {children}
    </>
  );
}
```

- children을 통해 중첩 레이아웃 또는 페이지에 접근할 수 있다.
- 이 말인 즉, 중첩 레이아웃이 있어도 root 레이아웃의 children 속성을 받아들여 감싸진 내용을 출력한다.
- 감싸진 내용에는 페이지와 기타 레이아웃(중첩 레이아웃)을 포함한다.

![](./image/layout.png)

<br>

### 📖 레이아웃에 커스텀 컴포넌트 추가

```js
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- `<Image>` : 더 최적화된 방법으로 이미지를 출력.
  - 페이지에서 실제로 보이는 경우에만 이미지가 표시되도록 이미지를 지연 로딩하여 구현.
  - 대응적인 이미지를 설정하는 프로세스 등을 단순화한다.
  - Next.js에 의해 생성된 `logoImg` 객체는 이미지를 임포트할 떄 최적화된 방법으로 image 컴포넌트를 띄울수 있도록 하는 유용한 정보를 포함하므로 `src={logoImg.src}`가 아니라 `src={logoImg}`로 작성했다.
  - `priority` 속성을 추가하여 이미지가 깜빡임 없이 우선적으로 로딩되도록 함.
  - 🔗 [NextJS | `<Image>`](https://nextjs.org/docs/app/api-reference/components/image)

![](./image/header.png)

<br>

### 📖 기타 커스텀 컴포넌트 사용

```js
// components/main-header/main-header-background.js
import styles from "./main-header-background.module.css";

export default function MainHeaderBackground() {
  return (
    <div className={styles["header-background"]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#59453c", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8f3a09", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

// components/main-header/main-header.js
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
```

<br>

### 📖 시작 페이지 내용 채우기
