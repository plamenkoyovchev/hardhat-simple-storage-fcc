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
		// Wait for 6 blocks to be mined
		await simpleStorageContract.deployTransation.wait(6);

		await verify(simpleStorageContract.address, []);
	}
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
