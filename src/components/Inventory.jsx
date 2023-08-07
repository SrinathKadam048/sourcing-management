import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

function Inventory() {
    // const count = 1;
    // const tabsData = [
    //     { item: "iPhone" , code: "IPH101", quantity: 60 ,price: 500000},
    //     { item: "Chargers" , code: "CHG201", quantity: 80 ,price: 600000},
    //     { item: "Samsung" , code: "SMG301", quantity: 70 ,price: 700000},
    //     { item: "Vivo" , code: "VIV401", quantity: 100 ,price: 800000},
    //     // Add more tabs data as needed
    //   ];
    
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/inventory').then((response) => {
            setInventoryData(response.data);
        }).catch((error) => {
            console.error('Error fetching inventory data', error);
        })
    }, []);

    return (
        
        <div className='container mt-3'>
            <h2>Inventory Management</h2>
            <div className='mb-3 mt-5 text-center'>
                {/* <button className='btn btn-success' style={{marginRight : '1rem'}}></button> */}
                <Link to='/add-item' className='btn btn-success' style={{marginRight : '1rem'}}>Add Item</Link>
                <button className='btn btn-outline-primary'>Modify Item</button>
                
            </div>

            <table className="table">
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
                {inventoryData.map((items, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{items.item}</td>
                        <td>{items.code}</td>
                        <td>{items.quantity}</td>
                        <td>{items.price}</td>
                        <td style={{width: "116px"}}>
                            <button className="btn btn-danger">Checkout</button>
                        </td>
                    </tr>
          ))}
                </tbody>

            </table>
        </div>
    );
}

export default Inventory;