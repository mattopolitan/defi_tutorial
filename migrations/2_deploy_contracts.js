// const DappToken = artifacts.require('DappToken')
// const DaiToken = artifacts.require('DaiToken')
// const TokenFarm = artifacts.require('TokenFarm')
//
// module.exports = async function(deployer, network, accounts) {
//     // Deploy Mock DAI Token
//     await deployer.deploy(DappToken)
//     const dappToken = await DappToken.deployed()
//
//     // Deploy Dapp Token
//     await deployer.deploy(DaiToken)
//     const daiToken = await DaiToken.deployed()
//
//     // Deploy TokenFarm
//     await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
//     const tokenFarm = await TokenFarm.deployed()
//
//     // Transfer all tokens to TokenFarm (1 million)
//     await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')
//
//     // Transfer 100 Mock DAI tokens to investor
//     await daiToken.transfer(accounts[1], '100000000000000000000')
//
// };

const MJToken = artifacts.require('MJToken')
const MJTokenStakeReward = artifacts.require('MJTokenStakeReward')

module.exports = async function(deployer, network, accounts) {
    // Deploy MJ Token
    await deployer.deploy(MJToken)
    const mjToken = await MJToken.deployed()

    // Deploy TokenFarm
    await deployer.deploy(MJTokenStakeReward, mjToken.address, )
    const mjTokenStakeReward = await MJTokenStakeReward.deployed()

    // Transfer all tokens to MJTokenStakeReward (1 million)
    await mjToken.transfer(mjTokenStakeReward.address, '1000000000000000000000000')

    // Transfer 100 MJ tokens to investor
    await mjToken.transfer(accounts[1], '100000000000000000000')

};
