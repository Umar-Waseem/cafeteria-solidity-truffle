import React, { useState } from 'react';
import '../App.css';
import Navbar from './Navbar';

function AdminAddItem() {

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  

  const handleSubmit = () => { 
    alert('Item added successfully');
  }



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center" style={{ marginTop: '50px', color: 'white' }}>Add Item to Menu</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f8f9fa', marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Item Name:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Item Quantity:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Item Price:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </label>
          
          <button
            style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            type="submit"
          >
            Add
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminAddItem