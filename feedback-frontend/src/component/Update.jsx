import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    name: "",
    email: "",
    performance: 0,
  });

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`);
      if (response.ok) {
        const data = await response.json();

        setEmployee(data);
      } else {
        console.error("Failed to fetch employee data");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        navigate("/list");

        console.log("Employee updated successfully");
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleUpdateSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="number"
          name="performance"
          value={employee.performance}
          placeholder="Performance"
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
