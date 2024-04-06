import "./App.css";
// import Header from "./component/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeList from "./component/EmployeeList";
import Home from "./component/Home";
import SignIn from "./component/Signin";
import SignUp from "./component/Signup";
import AddEmployee from "./component/AddEmployee";
import Update from "./component/Update";
import { useEffect } from "react";
import { useAuth } from "./state/auth";
import { BASE_URL } from "./utils/constant";

const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "list",
    element: <EmployeeList />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/add",
    element: <AddEmployee />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);

function App() {
  const { login } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/employees/identify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          login(data.user);
        } else {
          console.error("Failed to sign in");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };
    fetchUser();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
