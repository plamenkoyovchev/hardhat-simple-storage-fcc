require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.RPC_PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

module.exports = {
	defaultNetwork: "hardhat",
	solidity: "0.8.17",
	networks: {
		hardhat: {},
		ganache: {
			url: RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 1337,
		},
	},
};
