const hre = require("hardhat");
//0x5FbDB2315678afecb367f032d93F642f64180aa3
async function main() {
    // Get the ContractFactory of your SimpleContract
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();

    await crowdFunding.waitForDeployment();

    console.log(`CrowdFunding deployed to ${crowdFunding.target}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});