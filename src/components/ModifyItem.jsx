import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ModifyItem() {

  const [itemDetails, setItemDetails] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [modifiedData, setModifiedData] = useState({ name: '', price: 0 });

  useEffect(() => {
    console.log("UseEffect Hit! ")
    fetchItemDetails()
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      const filteredDetails = response.data.map(item => ({
        code: item.code,
        item: item.item,
        price: item.price,
      }));
      setItemDetails(filteredDetails);
      //   console.log(filteredDetails);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleSelectItem = (itemId) => {
    const selectedItem = itemDetails.find(item => item.code === itemId);
    setSelectedItemId(itemId);
    setModifiedData({ name: selectedItem.item, price: selectedItem.price });
    console.log(modifiedData);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setModifiedData(prevData => ({ ...prevData, [name]: value }));
    console.log(modifiedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        item: modifiedData.name,
        price: modifiedData.price,
      };

      // Call the updateItem function to update the item in the database
      await updateItem(selectedItemId, newData);

      // Handle any actions after a successful update, such as showing a success message
      console.log('Item updated successfully');
      alert('Item updated successfully');

      // You can also reset the form data or redirect to another page if needed
    } catch (error) {
      console.error('Error updating item:', error);
      // Handle errors here, show an error message to the user, etc.
    }
  };

  const updateItem = async (itemId, newData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/inventory/updateItem/${itemId}`, newData);
      console.log('Item updated:', response.data);
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  };

  return (
    <div className="vh-80 d-flex justify-content-center mt-3">
      <div className="w-50 p-4 border border-2 rounded">
        <h2>Modify Item</h2>
        <label className='form-label'>Item Id: </label>
        <select className='form-select' onChange={(e) => handleSelectItem(e.target.value)}>
          <option value="">Select an ItemID</option>
          {itemDetails.map(item => (
            <option key={item.code} value={item.code}>{item.code}</option>
          ))}
        </select>
        {selectedItemId && (
          <div className="col-auto mt-3">
            <form onSubmit={handleSubmit}>
              <label className='form-label'>Item Name </label>
              <input
                type="text"
                name="name"
                value={modifiedData.name}
                onChange={handleFieldChange}
                className='form-control'
              />
              <div className='mt-3 mb-3'>
                <label className='form-label'>Item Price </label>
                <input
                  type="number"
                  name="price"
                  value={modifiedData.price}
                  onChange={handleFieldChange}
                  className='form-control'
                />
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className='btn btn-success'>Update</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModifyItem;