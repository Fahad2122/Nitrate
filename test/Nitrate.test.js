const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { INITIAL_VALUE } = require("../helper-hardhat-config");


describe("Nitrate", function () {
    let nitrate, nitrateAddress, accounts
    
    beforeEach(async () => {
        accounts = await getNamedAccounts();
        await deployments.fixture(["all"]);

        const [deployer] = await ethers.getSigners();

        nitrateAddress = (await deployments.get("Nitrate")).address;
        nitrate = await ethers.getContractAt("Nitrate", nitrateAddress, deployer);
    })

    describe("constructor", function () {
        it("checks if name and symbol sets correctly", async () => {
            assert.equal((await nitrate.name()), "Nitrate");
            assert.equal(await nitrate.symbol(), "NTR");
        })
        
        it("checks if total sypply sets coreectly", async () => {
            assert.equal(await nitrate.totalSupply(), INITIAL_VALUE);
        })
    })

    describe("transfer", function () {
        it("should successfuly transfer the tokens", async () => {
            const user = accounts.user2
            const amount = ethers.parseEther("10");
            await nitrate.transfer(user, amount);
            expect(await nitrate.balanceOf(user)).to.equal(amount);
        })
        
        it("checks if the addresss is sets correctly", async () => {
            expect(await nitrate.transfer(accounts.zero, "100")).to.be.revertedWithCustomError(nitrate, "ERC20InvalidReceiver");
        })
        
        it("checks if the enought sending amount is in the account of sender", async () => {
            const amount = ethers.parseEther("100000000")
            await expect(nitrate.transfer(accounts.user2, amount)).to.be.revertedWithCustomError(nitrate, "ERC20InsufficientBalance");
        })
        
        it("emits the Transfer event on successful transfor", async () => {
            await expect(nitrate.transfer(accounts.user2, "100")).to.emit(nitrate, "Transfer");
        })
    })

    describe("allowances", function () {
        let newNitatreAddress, newNitrate, amount, deployer, user1;
        beforeEach(async () => {
            newNitatreAddress = (await deployments.get("Nitrate")).address;
            const [_deployer, _user1] = await ethers.getSigners();
            deployer = _deployer;
            user1 = _user1;
            newNitrate = await ethers.getContractAt("Nitrate", newNitatreAddress, user1);

            amount = ethers.parseEther("3");
        })

        it("should allow other accounts to transfer your tokens", async () => {
            await nitrate.approve(user1, amount);
            await newNitrate.transferFrom(deployer, user1, amount);
            expect(await newNitrate.balanceOf(user1)).to.equal(amount);
        })

        it("Should not allow unapproved accounts to transfer", async () => {
            await expect(newNitrate.transferFrom(deployer, user1, amount)).to.be.revertedWithCustomError(newNitrate, 'ERC20InsufficientAllowance');
        })

        it("should emit a Approval event on approval", async () => {
            await expect(nitrate.approve(user1, amount)).to.emit(nitrate, "Approval");
        })

        it("should set allowed limit correctly", async () => {
            await nitrate.approve(user1, amount);
            assert.equal((await nitrate.allowance(deployer, user1)).toString(), amount);
        })

        it("should not allow user to send more than allowed limit", async () => {
            const newAmount = ethers.parseEther("5");
            await nitrate.approve(user1, amount);
            await expect(newNitrate.transferFrom(deployer, user1, newAmount)).to.be.revertedWithCustomError(newNitrate, "ERC20InsufficientAllowance");
        })
    })

})