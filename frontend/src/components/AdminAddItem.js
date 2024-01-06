import React, { useState } from 'react';
import '../App.css';
import Navbar from './Navbar';
import { Web3 } from "web3";
import { menuContractAddress } from '../addresses';
import menuContract from "../contractAbis/MenuManagement.json"

function AdminAddItem() {

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');


  const handleSubmit = () => {
    addItemToMenu();
  };

  async function addItemToMenu() {
    try {
      const web3 = new Web3('http://localhost:7545');
      const menuContractABI = menuContract.abi;

      const menuManagementContract = new web3.eth.Contract(
        menuContractABI,
        menuContractAddress
      );

      console.log("Item Name: ", itemName);
      console.log("Item Quantity: ", itemQuantity);
      console.log("Item Price: ", itemPrice);

      let fromAccount = localStorage.getItem('account');
      let gas = 6000000;

      console.log("from account: ", fromAccount);

      const res = await menuManagementContract.methods.addItem(itemName, parseInt(itemQuantity, 10), parseInt(itemPrice, 10)).send({ from: fromAccount, gas: gas })
      console.log("Transaction Hash: ", res.transactionHash);
      alert("Item added successfully");
    } catch (error) {
      console.log("Error", error);
      alert(error);
      console.log(error.stack);
      alert(error.stack);
    }
  }


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center" style={{ marginTop: '50px', color: 'white' }}>Add Item to Menu</h1>
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
          onClick={handleSubmit}
        >
          Add Item
        </button>

      </div>
    </div>
  )
}

export default AdminAddItem