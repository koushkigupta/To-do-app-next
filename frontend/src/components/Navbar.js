import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" href="/">
        To-Do Application
      </Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/signup">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </li>
            </>
          )}

          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/settings">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
