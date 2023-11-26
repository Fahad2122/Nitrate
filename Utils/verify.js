const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
    console.log("verfing contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (error) {
        if(error.message.toLowerCase.includes("alredy verified")){
            console.log("Contract is already verfied");
        }
        else{
            console.log(error);
        }
    }
}

module.exports = {
    verify
}