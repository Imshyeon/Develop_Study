import { Outlet, Link } from "react-router-dom";
export default function Root() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
