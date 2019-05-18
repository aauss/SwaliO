const ethers = require("ethers");

module.exports = {
  getProvider: (jsonRpcUrl) => {
    return new ethers.providers.JsonRpcProvider(jsonRpcUrl);
  },
  getSigner: (privateKey, provider) => {
    return new ethers.Wallet(privateKey, provider);
  },
  getContract: (contractAddress, abi, provider) => {
    return new ethers.Contract(contractAddress, abi, provider);
  }
};
