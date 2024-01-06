const MenuManagement = artifacts.require("MenuManagement");
const OrderContract = artifacts.require("OrderContract");

module.exports = async function (deployer) {
  await deployer.deploy(MenuManagement);
  menuManagementInstance = await MenuManagement.deployed();

  await deployer.deploy(OrderContract, menuManagementInstance.address);
};