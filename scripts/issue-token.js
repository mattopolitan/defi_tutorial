// const TokenFarm = artifacts.require('TokenFarm')
//
// module.exports = async function(callback) {
//     let tokenFarm = await TokenFarm.deployed()
//     await tokenFarm.issueToken()
//
//
//     // Code goes here...
//     console.log("Tokens issued!")
//
//     callback()
// };

const MJTokenStakeReward = artifacts.require('MJTokenStakeReward')

module.exports = async function(callback) {
    let mjTokenStakeReward = await MJTokenStakeReward.deployed()
    await mjTokenStakeReward.issueToken()


    // Code goes here...
    console.log("Tokens issued!")

    callback()
};