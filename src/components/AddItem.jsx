import React, { useState } from "react";
import axios from 'axios';
import Bugfender from '../bugfender'

function AddItem() {
    const myStyle = {
        marginRight: "1rem",
        marginLeft: "-1rem"
    }

    const [isItemIdValid, setIsItemIdValid] = useState();
    const [isValidate, setValidate] = useState();
    const [resObj, setResObj] = useState("");
    const [formData, setFormData] = useState({
        itemId: '',
        itemName: '',
        itemQuantity: 0,
        itemPrice: 0
    });

    const handleValidate = async () => {
        try {

            const response = await axios.get(`https://sourcing-management-app.onrender.com/api/inventory/checkItem/${formData.itemId}`);
            setResObj(response.data.object);
            if (!response.data.isValid) {
                setIsItemIdValid(false);
                setValidate(true)
                alert("Invalid Item ID")
            }
            else if (response.data.isValid) {
                setIsItemIdValid(true)
                setValidate()
            }
        } catch (error) {
            console.error("Error while validating item ID:", error);
        }
    };

    const handleItemIdChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (isValidate && isItemIdValid) {
            setValidate()
            setIsItemIdValid()
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post('http://localhost:5000/api/inventory/addItem', formData);
            const response = await axios.post('https://sourcing-management-app.onrender.com/api/inventory/addItem', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log('New item created:', response.data);
            Bugfender.log('New item created:', response.data)
            alert("New Item Created")
            // Handle any actions after successful form submission
            // For example, show a success message, redirect to another page, etc.
            window.location.reload();
            // Reset the form data after successful submission


            setValidate(false);
            setIsItemIdValid(true);
        } catch (error) {
            console.error('Error creating new item:', error);
            // Handle errors here, e.g., show an error message to the user
        }
        // } else {
        //   console.log('ItemID is invalid. Form submission prevented.');
        //   alert("Didnt submit")
        // }
    };

    return (
        <div className="vh-80 d-flex justify-content-center mt-3">
            <div className="w-50 p-4 border border-2 rounded">
                <form noValidate onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Item Id: </label>
                        <input
                            type='text'
                            className={`form-control`}
                            name='itemId'
                            aria-describedby="itemIdHelp"
                            onChange={handleItemIdChange}
                            value={formData.itemId}
                        >
                        </input>
                        {!isValidate && isItemIdValid == null && (
                            <div id="itemIdHelp" className="form-text">
                                Enter Unique Item ID here
                            </div>
                        )}
                        {isValidate && isItemIdValid !== null && (
                            <div
                                id="itemIdHelp"
                                className={`form-text ${isItemIdValid ? "text-success" : "text-danger"}`}
                            >
                                {isItemIdValid ? "You can use this ID." : `Item ID already exists for Item ${resObj}`}
                            </div>
                        )}
                    </div>
                    <div className="col-auto">
                        <label htmlFor="itemName" className="col-form-label">Item Name</label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            name="itemName"
                            className="form-control"
                            aria-describedby="itemNameHelpInline"
                            value={formData.itemName}
                            onChange={handleItemIdChange}
                        >
                        </input>
                    </div>
                    <div className="col-auto mb-3">
                        <span id="itemNameHelpInline" className="form-text">
                            Enter Item Name Here
                        </span>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="quantity">Quantity </label>
                        <input
                            type='number'
                            className='form-control'
                            name='itemQuantity'
                            aria-describedby="quantityHelp"
                            value={formData.itemQuantity}
                            onChange={handleItemIdChange}
                            disabled
                        >
                        </input>
                        <div id="quantityHelp" className="form-text">Number of Items to be added</div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="price">Price </label>
                        <input
                            type='number'
                            className='form-control'
                            name='itemPrice'
                            aria-describedby="quantityHelp"
                            value={formData.itemPrice}
                            onChange={handleItemIdChange}
                        >
                        </input>
                        <div id="quantityHelp" className="form-text">Price of each Item</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success" type="button" style={myStyle} onClick={handleValidate}>Validate</button>
                        {/* <button type="submit" className="btn btn-primary" >Submit</button> */}
                        {isItemIdValid && (
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItem;