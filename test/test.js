const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quadratic Voting Deploy and Tests", function () {
  let qverv721Contract;

  beforeEach("Deploying the contract", async function () {
    const qverv721Factory = await ethers.getContractFactory(
      "QuadraticVotingERC721"
    );
    qverv721Contract = await qverv721Factory.deploy();
    await qverv721Contract.deployed();

    console.log(
      `Quadratic Voting Contract Deployed at: ${qverv721Contract.address}`
    );
  });

  it("Checks whether the owner is initialized", async function () {
    const [owner] = await ethers.getSigners();
    const contractOwner = await qverv721Contract.owner();
    assert(owner.address, contractOwner);
  });
});
