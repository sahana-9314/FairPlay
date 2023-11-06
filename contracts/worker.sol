// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowSol {
    
    mapping(address => uint) public directory;
    mapping (address => uint) public claimable;
    
    function register(uint isClient) public {
        directory[msg.sender] = isClient;
    }

    function pay (address worker) public payable {
        claimable[worker] += msg.value;
    }
    
    function claim () public {
        payable(msg.sender).transfer(claimable[msg.sender]);
        claimable[msg.sender] = 0;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
