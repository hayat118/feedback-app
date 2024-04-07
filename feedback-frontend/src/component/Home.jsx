import React from "react";
// import EmployeeList from "./EmployeeList";
import Header from "./Header";

function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="content">
        <h1>
          <span className="small">Welcome To</span>
          <br /> Feedback App
        </h1>
      </div>
    </div>
  );
}

export default Home;
