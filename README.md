# Nitrate ERC20 Token

Nitrate is an ERC20 token with the symbol NTR. This project uses OpenZeppelin for smart contract development and Hardhat for deploying and testing on a local server.

## Commands

### Install Dependencies

```bash
npm install
```
OR if you are using yarn
```bash
yarn install
```

### Compilation

```bash
hh compile
```

### Deploying
Deploying on hardhat/localhost
```bash
hh deploy
```

Deploying on a specific network (sepolia)
```bash
hh deploy --network <NETWROK NAME>
```

### Testing
Testing on hardhat/localhost
```bash
hh test
```
Testing on a specific network (sepolia)
```bash
hh test --network <NETWROK NAME>
```

### Configuration
Create a .env file in the global directory and add the following variables:
```dotenv
<NETWORK NAME>_RPC_URL="ENTER YOUR RPC URL"
PRIVATE_KEY="ENTER YOUR PRIVATE KEY"
ETHERSCAN_API_KEY="ENTER YOUR ETHERSCAN API KEY"
```

## Happy Programing!