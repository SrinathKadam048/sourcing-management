import React from "react";

function Dashboard() {
    return (
        <div className="container-fluid">
            <div className="row">
            {/* Left Div */}
            <div className="col-md-6 d-flex justify-content-center align-items-center bg-primary text-white">
                <h1>Budget</h1>
        </div>

        {/* Right Div */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-secondary text-white">
          <h3>Tasks</h3>
        </div>
      </div>
    </div>
    );
}

export default Dashboard;