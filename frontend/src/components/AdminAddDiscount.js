import React, { useState } from 'react';
import '../App.css';
import Navbar from './Navbar';

function AdminAddDiscount() {

  const [itemName, setItemName] = useState('');
  const [itemDiscount, setItemDiscount] = useState('');
  

  const handleSubmit = () => { 
    alert('Discount added successfully');
  }



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center" style={{ marginTop: '50px', color: 'white' }}>Add Discount to Item</h1>
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
            Discount Percentage:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="number"
              value={itemDiscount}
              onChange={(e) => setItemDiscount(e.target.value)}
              required
            />
          </label>
          
          <button
            style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            type="submit"
          >
            Enter
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminAddDiscount