import React from "react";

function Dashboard() {
  const tabsData = [
    { title: "Inventory Management" },
    { title: "Budget" },
    {title: "Create PR"},
    {title: "Manage Users"}
    // Add more tabs data as needed
  ];
  const handleCardClick = (title) => {
    // Here, you can add logic for handling the click event for each card
    console.log(`Clicked on ${title} card.`);
    // You can navigate to the respective page or perform any other actions as needed.
  };

    return (
      <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {tabsData.map((tab, index) => (
          <div className="col" key={index}>
            {/* Wrap the card with an anchor tag */}
            <a
              href="#"
              className="card h-100"
              onClick={() => handleCardClick(tab.title)}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{tab.title}</h5>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
      
    );
}

export default Dashboard;