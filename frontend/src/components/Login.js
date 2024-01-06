import React, { useState } from 'react';
import '../App.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';

import { adminAddress } from '../addresses';

import Web3 from "web3";

function Login() {
  const { ethereum } = window;
  const requestAccount = async () => {
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts);
      let account = accounts[0].trim();
      console.log("Current account: " + account);
      console.log("Admin account: " + adminAddress);

      setAddress(account);
      getBalance();

      // Save account to local storage
      localStorage.setItem('account', account);

      // retrieve account from local storage
      // account = localStorage.getItem('account');

      if (account.toLowerCase() === adminAddress.toLowerCase()) {
        console.log("Admin");
        window.location.href = "/admindashboard";
      } else {
        console.log("User");
        window.location.href = "/userdashboard";
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getBalance = async () => {
    try {
      const balance = await ethereum.request({ method: 'eth_getBalance', params: [address] });
      const balanceInEth = Web3.utils.fromWei(balance, 'ether');
      setBalanceETH(balanceInEth);
      console.log(balanceETH);
    } catch (error) {
      console.log(error);
    }
  }

  const [balanceETH, setBalanceETH] = useState(0);
  const [address, setAddress] = useState('');


  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>

              <button className='mx-2 px-5 custom-btn' type='button' onClick={requestAccount}>
                Connect With Metamask
              </button>


            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
