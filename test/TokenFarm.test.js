const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')
const MJToken = artifacts.require('MJToken')
const MJTokenStakeReward = artifacts.require('MJTokenStakeReward')


require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'Ether')
}

// contract('TokenFarm', ([owner, investor]) => {
//     let daiToken, dappToken, tokenFarm
//
//     before(async () => {
//         // Load Contracts
//         daiToken = await DaiToken.new()
//         dappToken = await DappToken.new()
//         tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
//
//         //Transfer all Dapp tokens to form (1 million)
//         await dappToken.transfer(tokenFarm.address, tokens('1000000'))
//
//         // Send tokens to investor
//         await daiToken.transfer(investor, tokens('100'), {from:owner})
//
//     })
//
//     // Write tests here...
//     describe('Mock DAI deployment', async () => {
//         it('has a name', async () =>{
//             const name = await daiToken.name()
//             assert.equal(name, 'Mock DAI Token')
//         })
//     })
//
//     describe('Dapp Token deployment', async () => {
//         it('has a name', async () =>{
//             const name = await dappToken.name()
//             assert.equal(name, 'DApp Token')
//         })
//     })
//
//     describe('Token Farm deployment', async () => {
//         it('has a name', async () =>{
//             const name = await tokenFarm.name()
//             assert.equal(name, 'Dapp Token Farm')
//         })
//
//         it('contract has tokens', async () =>{
//             let balance = await dappToken.balanceOf(tokenFarm.address)
//             assert.equal(balance.toString(), tokens('1000000'))
//         })
//     })
//
//     describe('Farming tokens', async () => {
//         it('rewards investors for staking mDai tokens', async () => {
//             let result
//
//             // Check investor balance before staking
//             result = await daiToken.balanceOf(investor)
//             assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')
//
//             // Stake Mock DAI Tokens
//             await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
//             await tokenFarm.stakeTokens(tokens('100'), {from: investor})
//
//             // Check staking result
//             result = await daiToken.balanceOf(investor)
//             assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')
//
//             result = await daiToken.balanceOf(tokenFarm.address)
//             assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')
//
//             result = await tokenFarm.stakingBalance(investor)
//             assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')
//
//             result = await tokenFarm.isStaking(investor)
//             assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
//
//             // Issue Tokens
//             await tokenFarm.issueToken({from: owner})
//
//             //Check balances after issuance
//             result = await dappToken.balanceOf(investor)
//             assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct after issuance')
//
//             //Ensure that only owner can issue tokens
//             await tokenFarm.issueToken({from: investor}).should.be.rejected;
//
//             // Unstake Tokens
//             await tokenFarm.unstakeTokens({from: investor})
//
//             // Check result after unstaking
//             result = await daiToken.balanceOf(investor)
//             assert.equal(result.toString(), tokens('100'), 'investor Mock Dai wallet balance correct after staking')
//
//             result = await daiToken.balanceOf(tokenFarm.address)
//             assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')
//
//             result = await tokenFarm.stakingBalance(investor)
//             assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')
//
//             result = await tokenFarm.isStaking(investor)
//             assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
//         })
//     })
//
// })

contract('MJTokenStakeRewardTest', ([owner, investor]) => {
    let mjToken, mjTokenStakeReward

    before(async () => {
        // Load Contracts
        mjToken = await MJToken.new()
        mjTokenStakeReward = await MJTokenStakeReward.new(mjToken.address)

        //Transfer all Dapp tokens to form (1 million)
        await mjToken.transfer(mjTokenStakeReward.address, tokens('1000000'))

        // Send tokens to investor
        await mjToken.transfer(investor, tokens('100'), {from:owner})

    })

    // Write tests here...
    describe('MJ Token deployment', async () => {
        it('has a name', async () =>{
            const name = await mjToken.name()
            assert.equal(name, 'MJ Token')
        })
    })

    describe('MJ Token Stake Reward deployment', async () => {
        it('has a name', async () =>{
            const name = await mjTokenStakeReward.name()
            assert.equal(name, 'MJ Token Stake Reward')
        })

        it('contract has tokens', async () =>{
            let balance = await mjToken.balanceOf(mjTokenStakeReward.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming tokens', async () => {
        it('rewards investors for staking MJ tokens', async () => {
            let result

            // Check investor balance before staking
            result = await mjToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor MJ Token wallet balance correct before staking')

            // Stake Mock DAI Tokens
            // await mjToken.approve(mjTokenStakeReward.address, tokens('2'), {from: investor})
            await mjTokenStakeReward.stakeTokens(tokens('2'), {from: investor})

            // Check staking result
            result = await mjToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('98'), 'investor MJ Token wallet balance correct after staking')

            result = await mjToken.balanceOf(mjTokenStakeReward.address)
            assert.equal(result.toString(), tokens('1000002'), 'MJ Token Stake Reward balance correct after staking')

            result = await mjTokenStakeReward.stakingBalance(investor)
            assert.equal(result.toString(), tokens('2'), 'investor staking balance correct after staking')

            result = await mjTokenStakeReward.isStaking(investor)
            assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

            // Issue Tokens
            await mjTokenStakeReward.issueToken({from: owner})

            //Check balances after issuance
            result = await mjToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('98'), 'investor MJ Token wallet balance correct after issuance')

            //Ensure that only owner can issue tokens
            await mjTokenStakeReward.issueToken({from: investor}).should.be.rejected;

            // Unstake Tokens
            await mjTokenStakeReward.unstakeTokens({from: investor})

            // Check result after unstaking
            result = await mjToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('102'), 'investor MJ Token wallet balance correct after staking')

            result = await mjToken.balanceOf(mjTokenStakeReward.address)
            assert.equal(result.toString(), tokens('999998'), 'MJ Token Stake Reward balance correct after staking')

            result = await mjTokenStakeReward.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

            result = await mjTokenStakeReward.isStaking(investor)
            assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
        })
    })

})