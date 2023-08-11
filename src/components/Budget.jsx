import React, { useEffect, useState } from "react";
import axios from 'axios';

function Budget() {

    const [budgetData, setBudgetData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/budget').then((response) => {
            setBudgetData(response.data);
        }).catch((error) => {
            console.error('Error fetching BUDGET data', error);
        })
    }, []);

    const handleClick = () => {
        console.log(budgetData);
    }

    return (
        <div className="d-flex mt-3">
            <h1>
                {budgetData.amount}
            </h1>
            <button onClick={handleClick}>Button</button>
        </div>
    )
}

export default Budget