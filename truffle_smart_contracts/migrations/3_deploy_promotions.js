const Promotions = artifacts.require("Promotions");

module.exports = function (deployer) {
    deployer.deploy(Promotions);
    };