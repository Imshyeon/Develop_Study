# 페이지 & 파일 기반 라우팅

[📌 파일 기반 라우팅이란?](#-파일-기반-라우팅이란)<br>
<br>

## 📌 파일 기반 라우팅이란?

- Next.js에서는 React 컴포넌트 파일을 생성. 그 후 Next.js가 설정된 폴더 구조로부터 프로젝트의 라우터를 도출.
- 예시
  > - **/pages** : Next.js는 pages 폴더를 확인하고 지원하고자 하는 라우트 몇 개를 추론한다.
  >   - **index.js** : 요청의 시작 페이지 임을 추론 (my-domain.com/)
  >   - **about.js** : About 페이지를 로딩 (my-domain.com/about)
  >   - **/products**
  >     - **index.js** : 모든 products에 관한 페이지 (my-domain.com/products)
  >     - **[id].js** : 동적 경로를 추가하는데 사용되는 특별 표기법. Product 상세 페이지 (my-domain.com/products/1)

<br>

### 📖 첫 번째 페이지 추가하기
