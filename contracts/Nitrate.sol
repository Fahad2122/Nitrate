// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Nitrate is ERC20 {
    constructor(uint256 initialValue) ERC20("Nitrate", "NTR") {
        _mint(msg.sender, initialValue);
    }
}