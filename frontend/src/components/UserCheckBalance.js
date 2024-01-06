import React, {useState} from "react";
import '../App.css';
import UserNavbar from "./UserNavbar";
import { ethers } from 'ethers';
import Web3 from "web3";

function UserCheckBalance(){
    const [balanceETH, setBalanceETH] = useState(0);
    const [balanceFC, setBalanceFC] = useState(0);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [address, setAddress] = useState('');
    const {ethereum} = window;

    const requestAccount = async () => {
        const accounts = await ethereum.request({method: 'eth_requestAccounts',
        params: [
            {
                eth_accounts: {}
            }],
        
    });
        console.log(accounts);
        const account = accounts[0];
        setAddress(account);
    }

    const getBalance = async () => {
        const balance = await ethereum.request({method: 'eth_getBalance', params: [address]});
        const balanceInEth = Web3.utils.fromWei(balance, 'ether');
        setBalanceETH(balanceInEth);
        console.log(balanceInEth);
    }

    return(
        <div className="App">
            <UserNavbar />
        <div style={{marginTop: '50px'}}>

            <a
                style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px'}}
                onClick={requestAccount}
            >
                Connect Wallet
            </a>

            <a
                style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                onClick={getBalance}
            >
                Check Balance
            </a>

            {/*Display Account Address once Connect Wallet is Pressed*/}
            <h1>Account Address: {address}</h1>
                
                {/*Display Balance in ETH*/}
            <h1>Balance in ETH: {balanceETH}</h1>
            <h1>Balance in FAST Coins: {balanceFC} FC</h1>
            <h1>Loyalty Points: {loyaltyPoints}</h1>
        </div>
        </div>
    )
}

export default UserCheckBalance
