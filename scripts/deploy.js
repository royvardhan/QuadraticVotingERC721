const { ethers, run, network } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory(
    "QuadraticVotingERC721"
  );
  console.log("------------Deploying Contract-----------");
  const contractVoting = await contractFactory.deploy();
  await contractVoting.deployed();
  console.log("Contract deployed at: " + (await contractVoting.address));
  // await verify(contractVoting.address, []);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
