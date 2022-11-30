const { run, network } = require("hardhat");
const GOERLI_CHAIN_ID = 5;

async function main() {
	const simpleStorageContractFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);
	const simpleStorageContract = await simpleStorageContractFactory.deploy();
	await simpleStorageContract.deployed();

	console.log(
		`Contract deployed to: ${simpleStorageContract.address} address.`
	);

	if (
		network.config.chainId === GOERLI_CHAIN_ID &&
		process.env.ETHERSCAN_API_KEY
	) {
		console.log("Waiting for 6 blocks to be mined ...");
		// Wait for 6 blocks to be mined
		await simpleStorageContract.deployTransaction.wait(6);

		await verify(simpleStorageContract.address, []);
	}

	const currentValue = await simpleStorageContract.retrieve();
	console.log(`Current value is: ${currentValue}`);

	// Update value
	const transactionResponse = await simpleStorageContract.store(53);
	await transactionResponse.wait(1);

	const updatedValue = await simpleStorageContract.retrieve();
	console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
	console.log("Verifying contract ...");

	try {
		// https://github.com/NomicFoundation/hardhat/blob/main/packages/hardhat-etherscan/src/constants.ts
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		console.error(`Contract verification error: ${error}`);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
