const button = document.querySelector("button");
const textParagraph = document.querySelector("p");

button.addEventListener("click", () => {
  const text = textParagraph.textContent;
  navigator.clipboard
    .writeText(text)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    }); //navigator.clipboard.writeText(text)가 프로미스 제공
});

// COPY 버튼을 누르면 undefined가 나오지만 cmd+v를 누르면 해당 텍스트가 복사된 것을 알 수 있다.