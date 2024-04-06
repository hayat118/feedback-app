import React, { useState, useEffect } from "react";
import Header from "./Header";
import "../App.css";
import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";
import { BASE_URL } from "../utils/constant";

const EmployeeList = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [feedbackData, setFeedbackData] = useState({
    id: "",
    feedback: "",
  });
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);

  //
  useEffect(() => {
    fetchEmployees();
  }, []);

  // fetch employee
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees`);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/employees/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          setEmployees(employees.filter((employee) => employee._id !== id));
        } else {
          console.error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  // update
  const handleUpdate = (employee) => {
    // console.log(employee);
    setFormData({
      id: employee._id,
      name: employee.name,
      email: employee.email,
    });
  };

  //
  const handleFeedbackToggle = (id) => {
    setFeedbackData({ id, feedback: "" });
    setShowFeedbackBox(!showFeedbackBox);
  };
  //
  const handleFeedbackChange = (e) => {
    setFeedbackData({ ...feedbackData, feedback: e.target.value });
  };
  //
  const handleFeedbackSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/employees/${feedbackData.id}/feedbacks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            feedback: feedbackData.feedback,
          }),
        }
      );

      if (response.ok) {
        fetchEmployees();

        setShowFeedbackBox(false);
      } else {
        console.error("Failed to post feedback");
      }
    } catch (error) {
      console.error("Error posting feedback:", error);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex primary-padding justify-btn">
        <div>
          <h2>List Of Employee</h2>
          <ul>
            {employees.map((employee) => (
              <li className="box" key={employee._id}>
                <h2>Name:{employee.name}</h2>
                <p>Email:{employee.email}</p>
                <p>Role:{employee.role}</p>
                <div className="flex justify-btn">
                  <p>performance:{employee.performance}</p>
                  <button onClick={() => handleFeedbackToggle(employee._id)}>
                    Add Feedbacks
                  </button>
                </div>
                {showFeedbackBox && feedbackData.id === employee._id && (
                  <div className="feedback-box">
                    <textarea
                      value={feedbackData.feedback}
                      onChange={handleFeedbackChange}
                      placeholder="Enter your feedback"
                    />
                    <button onClick={handleFeedbackSubmit}>Submit</button>
                  </div>
                )}
                <h3>Feedbacks:</h3>
                <ul>
                  {employee.feedbacks.map((feedback, index) => (
                    <li key={index}>{feedback}</li>
                  ))}
                </ul>
                {user?.role === "admin" ? (
                  <>
                    <Link
                      to={`/update/${employee._id}`}
                      onClick={() => handleUpdate(employee)}
                      className="btn"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="btn red"
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link to="/add">
            <button>Add Employee</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
