require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.RPC_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
	defaultNetwork: "hardhat",
	solidity: "0.8.17",
	networks: {
		hardhat: {},
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
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
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		// token: "MATIC" if we want to deploy to different network
	},
};
