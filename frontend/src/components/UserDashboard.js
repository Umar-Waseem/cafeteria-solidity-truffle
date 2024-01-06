import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UserNavbar from "./UserNavbar";

function UserDashboard() {
    const [itemName, setItemName] = React.useState("");
    const [itemQuantity, setItemQuantity] = React.useState("");
    const [sendAmount, setSendAmount] = React.useState("");
    let [totalAmount, setTotalAmount] = React.useState("");

    //set some predefined items in the menu in the items array along with their prices
    const [items, setItems] = React.useState([
        { name: "Pizza", price: 100 },
        { name: "Burger", price: 200 },
        { name: "Sandwich", price: 300 },
        { name: "Biryani", price: 400 },
    ]);

    const handleSubmit = () => {
        alert("Item ordered successfully");
    };

    function calculateTotalAmount() {
        let total = 0;
        items.forEach((item) => {
            if (item.name === itemName) {
                total = item.price * itemQuantity;
                totalAmount = setTotalAmount(total);
            }
        });
    }


    function getAddress() {
        let account = localStorage.getItem('account');
        console.log("from local: ", account);
        return account;
    }

    return (
        <div className="App">
            <UserNavbar />

            <div className="container mt-5">
                <h1 style={{ textAlign: "center", marginTop: "50px", color: "black" }}>
                    User: {getAddress()} <br />
                    Order Items
                </h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: "400px",
                        margin: "0 auto",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        backgroundColor: "#f8f9fa",
                        marginTop: "20px",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Items in Menu:
                        <select
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "16px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        >
                            <option value="">Select Item From Menu</option>
                            {items.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name} - {item.price} FC
                                </option>
                            ))}
                        </select>
                    </label>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Item Quantity:
                        <input
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "16px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            type="number"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)}
                            required
                        />
                    </label>

                    {/*calculate the total amount concurrently */}

                    <button
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={calculateTotalAmount}
                    >
                        Calculate Total Amount
                    </button>

                    <h3
                        style={{ textAlign: "center", marginTop: "50px", color: "black" }}
                    >
                        Total Amount: {totalAmount} FC
                    </h3>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Send Amount:
                        <input
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "16px",
                                boxSizing: "border-box",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            type="number"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            required
                        />
                    </label>

                    <button
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        type="submit"
                    >
                        Submit Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserDashboard;
