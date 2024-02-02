# 연습 프로젝트 : 음식 주문 앱에 Http 및 Form 적용하기

[📌 스스로 해결해보기](#-스스로-해결해보기)<br>
<br>

## 📌 스스로 해결해보기

### 📖 요구되는 동작 설명

#### 💎 동작 설명

1. 초기 화면에는 모든 products, 장바구니가 보인다.(dummy meal 데이터를 backend로 부터 Fetch하고 화면에 보여준다.(GET /meals))
2. 제품의 Add to Cart 버튼을 클릭하면 장바구니에 추가.
3. 장바구니 버튼(Cart)를 누르면 장바구니 안의 meal 데이터가 보여진다 &rarr; Close, Go to Checkout 버튼이 있다.
4. Go to Checkout 버튼을 누르면 Checkout 폼이 나오고 이 또한 모달로 보여진다. &rarr; Close, Submit Order 버튼이 있다.

#### 💎 조건

1. 유저는 장바구니에 제품을 추가 & 제거가 가능하다.
2. 로딩과 에러 state 다뤄야한다.
3. 유저 데이터와 함께 장바구니 데이터를 backend에 보내야한다.(POST /orders)
