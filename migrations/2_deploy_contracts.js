const TrashReward = artifacts.require('TrashReward')

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TrashReward)
  const instance = await TrashReward.deployed()
  await instance.addContainer(accounts[1], 523921600, 131239500)
  await instance.addContainer(accounts[2], 523938500, 131330600)
  await instance.addContainer(accounts[3], 523902700, 130994700)
  await instance.addContainer(accounts[4], 523799900, 131159500)
  await web3.eth.sendTransaction({
    from: accounts[1],
    to: instance.address,
    value: web3.utils.toWei('50')
  })
}
