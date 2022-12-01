require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("./tasks/block-number");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.RPC_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
	defaultNetwork: "hardhat",
	solidity: "0.8.17",
	networks: {
		hardhat: {},
		ganache: {
			url: "http://127.0.0.1:7545",
			chainId: 1337,
		},
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 5,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
};
