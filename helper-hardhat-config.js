const networkConfig = {
    31337: {
        name: "locahost",
    },
    11155111: {
        name: "sepoila"
    }
}

const INITIAL_VALUE = "1000000000000000000000000";

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    INITIAL_VALUE,
    developmentChains
}