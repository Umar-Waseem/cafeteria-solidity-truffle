import React from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AdminAddItem from './components/AdminAddItem';
import AdminAddDiscount from './components/AdminAddDiscount';
import UserOrderItem from './components/UserOrderItem';
import UserCheckBalance from './components/UserCheckBalance';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/login" element={<Login />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/AdminAddItem" element={<AdminAddItem />} />
        <Route path="/AdminAddDiscount" element={<AdminAddDiscount />} />
        <Route path="/UserOrderItem" element={<UserOrderItem />} />
        <Route path="/UserCheckBalance" element={<UserCheckBalance />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;