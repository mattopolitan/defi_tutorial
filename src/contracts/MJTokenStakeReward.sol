pragma solidity ^0.5.0;

import "./MJToken.sol";

contract MJTokenStakeReward {
    string public name = "MJ Token Stake Reward";
    MJToken public mjToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => uint) public rewardBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(MJToken _mjToken) public {
        mjToken = _mjToken;
        owner = msg.sender;
    }

    // 1. Stakes Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        //Code goes inside here..
        require(_amount > 0, "amount cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        mjToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already;
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        //Fetching staking & reward balance
        uint balance = stakingBalance[msg.sender];
        uint reward = rewardBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");
        //require(reward > 0, "reward balance cannot be 0");

        uint transferAmount = balance + reward;

        // Transfer MJ tokens to unstaker
        mjToken.transfer(msg.sender, transferAmount);

        // Transfer reward
        //mjToken.transfer(msg.sender, reward);

        // Reset staking balance & reward
        stakingBalance[msg.sender] = 0;
        rewardBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueToken() public{
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            rewardBalance[recipient] = rewardBalance[recipient] + balance;

            // mjToken.approve(msg.sender, rewardBalance[recipient] + stakingBalance[recipient]);

            if( balance > 0){
            //    mjToken.transfer(recipient, balance);
                //mjToken.approve(msg.sender, rewardBalance[recipient] + stakingBalance[recipient]);
            }
        }

    }

    // Return Reward Token value
    function returnRewardValue(address _address) public {

    }



}