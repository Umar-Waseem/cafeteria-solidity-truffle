import React, { useEffect, useState } from "react";
import '../App.css';
import UserNavbar from "./UserNavbar";
// import { ethers } from 'ethers';
import Web3 from "web3";

function UserCheckBalance() {
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
            <UserNavbar />
            <div style={{ marginTop: '50px' }}>


                {/*Display Account Address once Connect Wallet is Pressed*/}
                <h1>Account Address: {address}</h1>

                {/*Display Balance in ETH*/}
                <h1>Balance: {balance}</h1>
            </div>
        </div>
    )
}

export default UserCheckBalance
