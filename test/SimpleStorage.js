const { expect } = require("chai");
const { loadFixture } = require("ethereum-waffle");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
	async function deployTokenFixture() {
		const [owner, addr1] = await ethers.getSigners();

		const simpleStorageContractFactory = await ethers.getContractFactory(
			"SimpleStorage"
		);

		const simpleStorageContract = await simpleStorageContractFactory.deploy();
		await simpleStorageContract.deployed();

		return {
			owner,
			addr1,
			simpleStorageContract,
		};
	}

	it("Should deploy contract and test owner initial favorite number 77", async function () {
		const { simpleStorageContract } = await loadFixture(deployTokenFixture);

		const ownerFavoriteNumber = await simpleStorageContract.retrieve();
		expect(ownerFavoriteNumber).to.equal(77);
	});

	it("Should store addr1 favorite number 55", async function () {
		const { simpleStorageContract, addr1 } = await loadFixture(
			deployTokenFixture
		);

		const addr1Contract = await simpleStorageContract.connect(addr1);

		let favNumber = await addr1Contract.retrieve();
		expect(favNumber).to.equal(0);

		await addr1Contract.store(55);
		favNumber = await addr1Contract.retrieve();

		expect(favNumber).to.equal(55);
	});
});
