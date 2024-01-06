import React, { useEffect, useState } from "react";
import '../App.css';
import UserNavbar from "./UserNavbar";
import { ethers } from 'ethers';
import Web3 from "web3";
import { fcTokenContractAddress } from "../addresses";
import fcTokenContract from "../contractAbis/FastCoin.json";

function UserCheckBalance() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [FCtokenBalance, setFCtokenBalance] = useState(0);
    const [ethToConvert, setEthToConvert] = useState(0);

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

    const handleSubmit = async () => {
        convertEthToFC();
    };

    async function convertEthToFC() {
        try {
            const web3 = new Web3('http://localhost:7545');
            const fcTokenContractABI = fcTokenContract.abi;

            const fcTokenManagementContract = new web3.eth.Contract(
                fcTokenContractABI,
                fcTokenContractAddress
            );

            console.log("ETH to Convert: ", ethToConvert);

            let fromAccount = localStorage.getItem('account');
            let gas = 3000000;

            console.log("from account: ", fromAccount);

            const txReceipt = await fcTokenManagementContract.methods.getTokens(
                web3.utils.toWei(ethToConvert.toString(), 'ether') // Convert the entered ETH to Wei
            ).send({ from: fromAccount, gas: gas });

            // Log transaction hash and alert
            console.log("Transaction Hash: ", txReceipt.transactionHash);
            alert("ETH converted to FC successfully");

            // Fetch and display updated FC token balance
            const updatedFCBalance = await fcTokenManagementContract.methods.balanceOf(fromAccount).call();
            setFCtokenBalance(updatedFCBalance);

        } catch (error) {
            // Handle errors
            console.error("Error converting ETH to FC:", error);
            alert(`Error converting ETH to FC: ${error.message}`);
        }
    }



    return (
        <div className="App">
            <UserNavbar />
            <div style={{ marginTop: '50px' }}>


                {/*Display Account Address once Connect Wallet is Pressed*/}
                <h1>Account Address: {address}</h1>

                {/*Display Balance in ETH*/}
                <h1>Balance: {balance} ETH</h1> <br />

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Enter ETH to convert to FastCoin: <br />
                    <input
                        style={{ width: '10%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                        type="text"
                        value={ethToConvert}
                        onChange={(e) => setEthToConvert(e.target.value)}
                        required
                    />
                </label>

                <button
                    style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Convert
                </button>

                <h1>FastCoin Balance: {FCtokenBalance} FC</h1> <br />


            </div>
        </div>
    )
}

export default UserCheckBalance
