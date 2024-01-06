import React, { useEffect } from "react";
import "../App.css";
import UserNavbar from "./UserNavbar";
import Web3 from "web3";
import { menuContractAddress, orderContractAddress } from "../addresses";
import menuContract from "../contractAbis/MenuManagement.json";
import orderContract from "../contractAbis/OrderContract.json";

function UserDashboard() {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [itemName, setItemName] = React.useState("");
    const [itemQuantity, setItemQuantity] = React.useState("");
    const [totalOrderAmount, setTotalOrderAmount] = React.useState(0);
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        // Fetch menu items from the smart contract
        async function fetchMenuItems() {
            try {
                const web3 = new Web3("http://localhost:7545");
                const menuContractABI = menuContract.abi;
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
        placeOrder();
    };

    const placeOrder = async () => {
        try {
            const web3 = new Web3("http://localhost:7545");
            const orderContractABI = orderContract.abi;
            const orderSmartContract = new web3.eth.Contract(
                orderContractABI,
                orderContractAddress
            );

            // Prepare the necessary data for the order
            const itemIndexes = selectedItems.map((item) => items.findIndex((menu) => menu.name === item.name));
            const quantities = selectedItems.map((item) => item.selectedQuantity);
            const payment = totalOrderAmount;

            // Send the transaction to the smart contract
            await orderSmartContract.methods.placeOrder(itemIndexes, quantities, payment).send({
                from: localStorage.getItem("account"),
                gas: 6000000,
            });

            alert("Order placed successfully!");

        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order");
        }
    };

    const handleRemoveItem = (index) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(index, 1);
        setSelectedItems(updatedSelectedItems);
    };

    const handleAddItem = () => {
        const selected = items.find((item) => item.name === itemName);
        if (selected) {
            setSelectedItems([...selectedItems, { ...selected, selectedQuantity: parseInt(itemQuantity, 10) }]);
        }
        setItemName("");
        setItemQuantity("");
    };

    useEffect(() => {
        // Recalculate total order amount when selected items change
        const orderAmount = selectedItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0);
        setTotalOrderAmount(orderAmount);
    }, [selectedItems]);

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
                    type="button"
                    onClick={handleAddItem}
                >
                    Add Item
                </button>

                <h3 style={{ textAlign: "center", marginTop: "20px", color: "black" }}>
                    Selected Items:
                </h3>

                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - Quantity: {item.selectedQuantity} - Subtotal: {item.price * item.selectedQuantity} FC
                            <button
                                style={{
                                    backgroundColor: "red",
                                    color: "#fff",
                                    marginLeft: "10px",
                                    padding: "5px 8px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                            >
                                Remove Item
                            </button>
                        </li>
                    ))}
                </ul>



                <h3 style={{ textAlign: "center", marginTop: "20px", color: "black" }}>
                    Total Order Amount: {totalOrderAmount} FC
                </h3>

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
                    onClick={handleSubmit}
                >
                    Place Your Order
                </button>
            </div>
        </div>
    );
}


export default UserDashboard;
