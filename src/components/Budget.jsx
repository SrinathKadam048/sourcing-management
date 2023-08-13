import React, { useEffect, useState } from "react";
import axios from 'axios';

function Budget() {

    const [budgetData, setBudgetData] = useState({ amount: 0, company: "" });
    const [PRData, setPRData] = useState([]);
    const [actionTaken, setActionTaken] = useState(false)
    const [budgetFlag, setBudgetFlag] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/budget').then((response) => {
            setBudgetData(response.data);
        }).catch((error) => {
            console.error('Error fetching BUDGET data', error);
        })


    }, [budgetFlag]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/budget/getAllPRs').then((response) => {
            setPRData(response.data);
        }).catch((error) => {
            console.error('Error fetching PR data', error);
        })
    }, [actionTaken]);

    const handleApprove = async (PR) => {
        try {
            const newData = {
                isActionTaken: true,
            }
            const newBudget = {
                amount: budgetData.amount - PR.costPR,
            }

            const updatePRItemData = {
                quantity: PR.itemQuantity
            }
            const PR_ID = PR._id;
            if (newBudget.amount < 0) { alert("Budget Insufficient!") }
            else {
                await updatePR(PR_ID, newData)
                await updateBudget(budgetData.company, newBudget)
                await updatePRItem(PR.itemCode, updatePRItemData)
                alert("PR Accepted")
            }
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }

    }

    const updatePRItem = async (itemCode, approvedItemQuantity) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/inventory/updatePRQuantity/${itemCode}`, approvedItemQuantity)
            console.log(response.data)
        }
        catch (error) {
            console.log("Error updating Inventory Quantity for Approve PR");
        }
    }

    const updateBudget = async (company, newBudget) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/budget/updateBudget/${company}`, newBudget)
            console.log(response.data)
            setBudgetFlag(!budgetFlag);
        }
        catch (error) {
            console.error('Error updating BUDGET', error);
            throw error;
        }
    }

    const handleReject = async (PR) => {
        try {
            const newData = {
                isActionTaken: true,
            }
            const PR_ID = PR._id;
            await updatePR(PR_ID, newData)

            alert("PR Rejected")
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    const updatePR = async (PR_ID, newData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/budget/updatePR/${PR_ID}`, newData)
            console.log('Item updated:', response.data);
            setActionTaken(!actionTaken)
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    return (
        <div className="vh-80 container justify-content-start mt-3" >
            <div className="w-100 p-4 border border-2 rounded mb-3">
                <h2>Budget Management</h2>
                <hr></hr>
                <h4>Budget Available: {budgetData.amount}</h4>
            </div>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item Code</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope='col'>Total Cost</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {PRData.map((PR, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{PR.itemCode}</td>
                            <td>{PR.itemName}</td>
                            <td>{PR.itemQuantity}</td>
                            <td>{PR.itemPrice}</td>
                            <td>{PR.costPR}</td>
                            <td style={{ width: "150px" }}>
                                <div className="d-flex">
                                    <button className="btn btn-success" onClick={() => handleApprove(PR)}>Accept</button>
                                    <button className="btn btn-danger" onClick={() => handleReject(PR)}>Reject</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Budget