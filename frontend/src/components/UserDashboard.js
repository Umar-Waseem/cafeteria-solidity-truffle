import React, { useEffect } from "react";
import "../App.css";
import UserNavbar from "./UserNavbar";
import Web3 from "web3";
import { menuContractAddress } from "../addresses"; // Make sure to import the correct contract address
import menuContract from "../contractAbis/MenuManagement.json"

function UserDashboard() {
    const [itemName, setItemName] = React.useState("");
    const [itemQuantity, setItemQuantity] = React.useState("");
    const [sendAmount, setSendAmount] = React.useState("");
    const [totalAmount, setTotalAmount] = React.useState("");
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        // Fetch menu items from the smart contract
        async function fetchMenuItems() {
            try {
                const web3 = new Web3("http://localhost:7545"); // Update with your Ethereum node URL
                const menuContractABI = menuContract.abi; // Update with your menu contract ABI
                const menuManagementContract = new web3.eth.Contract(
                    menuContractABI,
                    menuContractAddress
                );

                const itemsCount = await menuManagementContract.methods.getItemsCount().call();
                const fetchedItems = [];

                const names = await menuManagementContract.methods.getAllItemNames().call();
                const prices = await menuManagementContract.methods.getAllItemPrices().call();
                const quantities = await menuManagementContract.methods.getAllItemQuantities().call();

                for (let i = 0; i < itemsCount; i++) {
                    fetchedItems.push({
                        name: names[i],
                        price: parseInt(prices[i], 10),
                        quantity: parseInt(quantities[i], 10),
                    });
                }

                setItems(fetchedItems);
                console.log("Fetched menu items:", fetchedItems);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        }

        fetchMenuItems();
    }, []);

    const handleSubmit = () => {
        alert("Item ordered successfully");
    };

    function calculateTotalAmount() {
        let total = 0;
        items.forEach((item) => {
            if (item.name === itemName) {
                total = item.price * itemQuantity;
                setTotalAmount(total);
            }
        });
    }

    function getAddress() {
        let account = localStorage.getItem("account");
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
                                    {item.name} - Price: {item.price} FC - Quantity: {item.quantity}
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

                    <h3 style={{ textAlign: "center", marginTop: "50px", color: "black" }}>
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
