const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quadratic Voting Deploy and Tests", function () {
  let qverc721Contract;

  beforeEach("Deploying the contract", async function () {
    const qverc721Factory = await ethers.getContractFactory(
      "QuadraticVotingERC721"
    );
    qverc721Contract = await qverc721Factory.deploy();
    await qverc721Contract.deployed();

    console.log(
      `Quadratic Voting Contract Deployed at: ${qverc721Contract.address}`
    );
  });

  it("Checks whether the owner is initialized", async function () {
    const [owner] = await ethers.getSigners();
    const contractOwner = await qverc721Contract.owner();
    assert(owner.address, contractOwner);
  });

  it("Should be able to create a proposal", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const nftAddress = addr1.address;
    const description = "This is the first proposal to test";
    const expirationTime = 1664282343;
    const tx = await qverc721Contract.createProposal(
      nftAddress,
      description,
      expirationTime
    );
    const proposalCount = await qverc721Contract.proposalCount();
    const proposal = await qverc721Contract.ProposalIdToProposal(proposalCount);
    const getDescription = await proposal.description;
    assert(getDescription, description);
  });

  it("Must not take more than 3 ON-GOING proposal from the same nft collection", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const nftAddress = addr1.address;
    const description = "This is the first proposal to test";
    const expirationTime = 1664282343;
    const totalProposals = 4;
    let error = false;

    try {
      for (let i = 0; i < totalProposals; i++) {
        await qverc721Contract.createProposal(
          nftAddress,
          description,
          expirationTime
        );
      }
    } catch (err) {
      error = true;
    }
    expect(error).to.eql(true);
  });
});
