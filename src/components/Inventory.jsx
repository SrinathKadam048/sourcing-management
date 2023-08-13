import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Inventory() {
    const [inventoryData, setInventoryData] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [clickedItem, setClickedItem] = useState(null);
    const [checkoutQuantity, setCheckoutQuantity] = useState(0);
    const [actionTaken, setActionTaken] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/inventory').then((response) => {
            setInventoryData(response.data);
        }).catch((error) => {
            console.error('Error fetching inventory data', error);
        })
    }, [actionTaken]);


    const handleCheckout = async (e) => {
        e.preventDefault();
        const sold = checkoutQuantity;
        const newQuantity = clickedItem.quantity - sold;
        if (newQuantity >= 0) {
            try {
                const newData = {
                    quantity: newQuantity
                };

                await updateCheckOutItem(clickedItem.code, newData);

                // Handle any actions after a successful update, such as showing a success message
                console.log('Item checked out successfully');
                alert('Item checked out successfully');
            } catch (error) {
                console.error('Error Checking out item:', error);
            }
            setActionTaken(!actionTaken)
            setShowCheckout(false)
        }
        else {
            alert("Stock Insufficient! Enter a value less than available stock")
        }

    };

    const updateCheckOutItem = async (itemId, newData) => {
        try {
            console.log(newData);
            const response = await axios.put(`http://localhost:5000/api/inventory/checkOutItem/${itemId}`, newData);
            console.log('Item updated:', response.data);
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    const handleQuantityChange = (e) => {
        setCheckoutQuantity(e.target.value);
    }

    const handleCheckoutClick = (item) => {
        setShowCheckout(!showCheckout);
        setClickedItem(item)
    };

    return (

        <div className='container mt-3'>
            <h2>Inventory Management</h2>
            <hr></hr>
            <div className='mb-3 mt-5 text-center'>
                {/* <button className='btn btn-success' style={{marginRight : '1rem'}}></button> */}
                <Link to='/add-item' className='btn btn-success' style={{ marginRight: '1rem' }}>Add Item</Link>
                {/* <button className='btn btn-outline-primary'>Modify Item</button> */}
                <Link to='/modify-item' className='btn btn-primary' style={{ marginRight: '1rem' }}>Modify Item</Link>
                <Link to='/createPR' className='btn' style={{ backgroundColor: 'purple', color: 'white' }}>Create PR</Link>

            </div>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Item Code</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.item}</td>
                            <td>{item.code}</td>
                            <td>
                                {item.quantity}
                                {showCheckout && clickedItem === item && (
                                    <div className='form-gorup row justify-content-center'>
                                        <div className='col-sm-6'>
                                            <input
                                                type="number"
                                                value={checkoutQuantity}
                                                onChange={handleQuantityChange}
                                                min={1}
                                                className='form-control'
                                            // max={item.quantity} // You might want to limit it to the available quantity
                                            />
                                            <div className='d-flex mt-1'>
                                                <button className="btn btn-primary" onClick={handleCheckout}>
                                                    Confirm Checkout
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </td>
                            <td>{item.price}</td>
                            <td style={{ width: "116px" }}>
                                {item.quantity != 0 && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleCheckoutClick(item)}
                                    >
                                        {showCheckout ? "Cancel" : "Checkout"}
                                    </button>)}
                                {item.quantity == 0 && (
                                    <Link to='/createPR' className='btn' style={{ backgroundColor: 'purple', color: 'white' }}>Create PR</Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default Inventory;