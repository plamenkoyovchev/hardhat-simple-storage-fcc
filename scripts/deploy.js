async function main() {
	const simpleStorageContractFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);
	const simpleStorageContract = await simpleStorageContractFactory.deploy();
	await simpleStorageContract.deployed();

	console.log(
		`Contract deployed to: ${simpleStorageContract.address} address.`
	);

	const favNumber = await simpleStorageContract.retrieve();
	console.log(`Favorite number is: ${favNumber}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
