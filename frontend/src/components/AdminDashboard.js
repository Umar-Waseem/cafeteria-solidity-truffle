import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from './Navbar';
import Web3 from "web3";

function AdminDashboard() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const account = localStorage.getItem('account');
      console.log("from local:", account);
      setAddress(account);

      try {
        const balance = await getBalance(account);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const getBalance = async (account) => {
    const { ethereum } = window;
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [account] });
    const balanceInEth = Web3.utils.fromWei(balance, 'ether');
    return balanceInEth;
  };

  return (
    <div className="App">
      <Navbar />
      <h2 className="container mt-5">
        Admin: {address} <br />
        Balance: {balance}
      </h2>
    </div>
  );
}

export default AdminDashboard;
