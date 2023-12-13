const { Web3 } = require("web3");
const fs = require("fs");

const orderContractAbiPath = "./build/contracts/OrderContract.json";
const menuManagementContractAbiPath = "./build/contracts/MenuManagement.json";
const orderContractAddress = "0x1D5292788d1FC736865F71f106Bcb67D78214216";
const menuManagementContractAddress = "0x2fCb3Ea71498e222b9258228283A86Ac9878029C";
const web3 = new Web3("http://localhost:8545");

const gasPrice = 20000000;

async function getAccountBalance(address){
    try {
        fs.appendFileSync("logs.txt", "Getting user balance...\n");
        let balance = await web3.eth.getBalance(address);
        fs.appendFileSync("logs.txt", `User Balance: ${balance}\n`);
        balance = web3.utils.fromWei(balance, "ether");
        fs.appendFileSync("logs.txt", `User Balance (in ether): ${balance}\n`);
        return balance;
    } catch (error) {
        console.error("Error while calculating balance:", error);
    }
}

async function interactWithContract(callback) {
    try {
        const orderContractAbi = JSON.parse(fs.readFileSync(orderContractAbiPath, "utf8"));
        const orderContract = new web3.eth.Contract(orderContractAbi.abi, orderContractAddress);

        const menuManagementContractAbi = JSON.parse(fs.readFileSync(menuManagementContractAbiPath, "utf8"));
        const menuManagementContract = new web3.eth.Contract(menuManagementContractAbi.abi, menuManagementContractAddress);

        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[5];

        await getAccountBalance(userAddress);
        
        fs.appendFileSync("logs.txt", `User Address: ${userAddress}\n`);
        fs.appendFileSync("logs.txt", "Adding menu items...\n");

        await menuManagementContract.methods.addMenuItem("Pizza", 10, 2).send({ from: userAddress, gas: gasPrice });
        await menuManagementContract.methods.addMenuItem("Burger", 5, 3).send({ from: userAddress, gas: gasPrice });

        fs.appendFileSync("logs.txt", "Menu items added successfully.\n");
        fs.appendFileSync("logs.txt", "Calculating total amount...\n");

        let totalAmount = BigInt(0);
        const itemIndexes = [0, 1];
        const quantities = [2, 3];

        totalAmount = await orderContract.methods.calculateOrderAmount(itemIndexes, quantities).call();

        fs.appendFileSync("logs.txt", `Total Amount: ${totalAmount}\n`);
        fs.appendFileSync("logs.txt", `Total Amount (ether) : ${web3.utils.fromWei(totalAmount, "ether")}\n`);

        fs.appendFileSync("logs.txt", "Placing order...\n");

        await orderContract.methods.placeOrder(itemIndexes, quantities).send({
            from: userAddress,
            value: totalAmount,
            gas: gasPrice,
        });

        fs.appendFileSync("logs.txt", "Order placed successfully!\n");
        await getAccountBalance(userAddress);
        callback();
    } catch (error) {
        fs.appendFileSync("logs.txt", `Error: ${error}\n`);
        console.error("Error while placing order:", error);
        callback(error);
    }
}

module.exports = function(callback) {
    interactWithContract(callback);
};
