import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserNavbar() {
    return (
        <div className='App'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to={"/userdashboard"} className="nav-link">
                        <h2 style={{ color: "white" }}>User Dashboard</h2>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ border: "1px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/userdashboard"} className="nav-link">
                                    Order Item
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "1px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/UserCheckBalance"} className="nav-link" >
                                    Check Balance
                                </Link>
                            </li>
                            
                            <li className="nav-item" style={{ border: "1px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/"} className="nav-link" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default UserNavbar