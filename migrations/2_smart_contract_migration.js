const SmartContract = artifacts.require("WeMintCash");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "Name", "Symbol", "https://");
};
