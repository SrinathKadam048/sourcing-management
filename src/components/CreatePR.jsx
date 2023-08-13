import React, { useEffect, useState } from 'react'
import axios from 'axios';



function CreatePR() {
    const [itemDetails, setItemDetails] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedItemData, setSelectedItemData] = useState({ item: " ", price: 0 });
    const [newQuantity, setNewQuantity] = useState(0);

    useEffect(() => {
        fetchItemDetails()
    }, []);

    // FETCHING DETAILS FOR DROPDOWN
    const fetchItemDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            const filteredDetails = response.data.map(item => ({
                code: item.code,
                item: item.item,
                price: item.price,
            }));
            setItemDetails(filteredDetails);
            //console.log(itemDetails);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    //SELECTED ITEM FROM DROPDOWN
    const handleSelectItem = (itemId) => {
        setSelectedItemId(itemId);
        setSelectedItemData(itemDetails.find(item => item.code === itemId));
    };

    //CHANGE IN QUANTITY
    const handleFieldChange = (e) => {
        setNewQuantity(e.target.value);
        console.log(newQuantity, selectedItemId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const newData = {
            //     item: modifiedData.name,
            //     price: modifiedData.price,
            // };
            const newData = {
                code: selectedItemId,
                name: selectedItemData.item,
                quantity: newQuantity,
                price: selectedItemData.price,
                cost: newQuantity * selectedItemData.price,
                isAction: false,
            }

            const response = await axios.post('http://localhost:5000/api/budget/addPR', newData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('New PR created:', response.data);
            alert("New PR Created")
            // You can also reset the form data or redirect to another page if needed
        } catch (error) {
            console.error('Error creating PR:', error);
            // Handle errors here, show an error message to the user, etc.
        }
    };

    // const updateItem = async (itemId, newData) => {
    //     try {
    //         const response = await axios.put(`http://localhost:5000/api/inventory/updateItem/${itemId}`, newData);
    //         console.log('Item updated:', response.data);
    //     } catch (error) {
    //         console.error('Error updating item:', error);
    //         throw error;
    //     }
    // };

    return (
        <div className="vh-80 d-flex justify-content-center mt-3">
            <div className="w-50 p-4 border border-2 rounded">
                <h2>Purchase Request</h2>
                <hr></hr>
                <div className="col-auto mt-3">
                    <label className='form-label'>Select an Item </label>
                    <select className='form-select' onChange={(e) => handleSelectItem(e.target.value)}>
                        <option value="">Item ID : Item Name</option>
                        {itemDetails.map(item => (
                            <option key={item.code} value={item.code}>{item.code} : {item.item}</option>
                        ))}
                    </select>
                </div>
                <div className="col-auto mt-3">
                    <form noValidate onSubmit={handleSubmit}>
                        <label className='form-label'>Item Name </label>
                        <input
                            type="text"
                            name="name"
                            value={selectedItemData.item}
                            className='form-control'
                            disabled
                        />

                        <div className='mt-3 mb-3'>
                            <label className='form-label'>Item Price </label>
                            <input
                                type="number"
                                name="price"
                                value={selectedItemData.price}
                                className='form-control'
                                disabled
                            />
                        </div>

                        <div className='mt-3 mb-3'>
                            <label className='form-label'>Purchase Quantity </label>
                            <input
                                type="number"
                                name="quantity2"
                                onChange={handleFieldChange}
                                className='form-control'
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePR;