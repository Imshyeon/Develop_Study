import { StrictMode } from "react"; // strict mode는 리액트에서 import하는 컴포넌트이므로 index.jsx에 작성.
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
