import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <div className=" navbar flex justify-btn primary-padding ">
        <div>
          <nav>Dashboard</nav>
        </div>
        <div>
          <nav>
            <ul className="flex gap">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/list">
                <li>List of Employee</li>
              </Link>
              {user ? (
                <>
                  <p>Hey {user.name}</p>
                  <button onClick={() => logout()}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <li>Sign In</li>
                  </Link>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
