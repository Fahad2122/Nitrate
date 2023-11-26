const { network } = require("hardhat");
const { INITIAL_VALUE, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../Utils/verify");


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } =await getNamedAccounts();

    const Nitrate = await deploy("Nitrate", {
        from: deployer,
        args: [INITIAL_VALUE],
        log: true,
        waitConfimations: network.config.blokConfirmations
    })
    log(`Contract deployed at ${Nitrate.address}`);

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(Nitrate.address, [INITIAL_VALUE])
    }
}

module.exports.tags = ["all", "nitrate"];