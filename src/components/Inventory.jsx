import React from 'react'

function Inventory() {
    const count = 1;
    const tabsData = [
        { item: "iPhone" , code: "IPH101", quantity: 60 ,price: 500000},
        { item: "Chargers" , code: "CHG201", quantity: 80 ,price: 600000},
        { item: "Samsung" , code: "SMG301", quantity: 70 ,price: 700000},
        { item: "Vivo" , code: "VIV401", quantity: 100 ,price: 800000},
        // Add more tabs data as needed
      ];


    return (
        <div className='container'>

            <div className='mb-3 mt-3 text-center'>
                <button className='btn btn-success' style={{marginRight : '1rem'}}>Add Item</button>
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
                {tabsData.map((tab, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tab.item}</td>
                        <td>{tab.code}</td>
                        <td>{tab.quantity}</td>
                        <td>{tab.price}</td>
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