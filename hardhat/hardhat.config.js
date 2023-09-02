require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config("");
/** @type import('hardhat/config').HardhatUserConfig */
const apiKey = process.env.API_KEY;
const mnemonic = process.env.MNEMONIC;
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      },
      url: "https://sepolia.infura.io/v3/" + apiKey,
    },
  },
};
