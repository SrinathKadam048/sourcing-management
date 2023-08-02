import React from "react";
import {
  Link,
} from "react-router-dom";

function Dashboard() {
  const tabsData = [
    { title: "Inventory Management" , link: "/Inventory"},
    { title: "Budget" , link: "/budget"},
    {title: "Create PR" , link: "/createPR"},
    {title: "Manage Users" , link: "/manageUsers"}
    // Add more tabs data as needed
  ];

    return (
      <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {tabsData.map((tab, index) => (
          <div className="col" key={index}>
            <Link to={tab.link} className="card h-100" style={{textDecoration:'none'}}>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{tab.title}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
      
    );
}

export default Dashboard;