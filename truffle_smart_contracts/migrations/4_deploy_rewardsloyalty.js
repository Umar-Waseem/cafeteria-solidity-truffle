const RewardsLoyalty = artifacts.require("RewardsLoyalty");

module.exports = function (deployer) {
    deployer.deploy(RewardsLoyalty);
    };