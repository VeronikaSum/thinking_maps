import { useNavigate } from "react-router-dom";
import { routes } from "../Common/routes";
import LogoutButton from "./authorization/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./authorization/LoginButton";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  return (
    <div className="navbar bg-base-100 mb-0">
      <div className="flex-1" onClick={() => navigate(routes.mainPage)}>
        <a className="btn btn-ghost normal-case text-xl">
          Mąstymo žemėlapių kūrimo įrankis
        </a>
      </div>
      {!user && <LoginButton />}
      {user && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              tabIndex={0}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => navigate(routes.profile)}>
              <a>Profilis</a>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Navbar;
