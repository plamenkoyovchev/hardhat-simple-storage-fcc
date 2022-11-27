const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
	it("Should deploy contract and test owner initial favorite number 77", async function () {
		const [owner] = await ethers.getSigners();

		const simpleStorageContractFactory = await ethers.getContractFactory(
			"SimpleStorage"
		);

		const simpleStorageContract = await simpleStorageContractFactory.deploy();
		await simpleStorageContract.deployed();

		const ownerFavoriteNumber = await simpleStorageContract.retrieve();
		expect(ownerFavoriteNumber).to.equal(77);
	});
});
