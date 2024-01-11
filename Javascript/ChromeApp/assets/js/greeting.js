const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const savedUserName = localStorage.getItem(USERNAME_KEY);

const paintGreetings = (userName) => {
  greeting.textContent = `Hello ${userName}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
};

const loginFormSubmitHandler = (e) => {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
};

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", loginFormSubmitHandler);
} else {
  paintGreetings(savedUserName);
}
