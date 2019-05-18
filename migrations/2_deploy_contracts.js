const TrashReward = artifacts.require('TrashReward')

module.exports = async (deployer, network, [ owner, container, other ]) => {
  await deployer.deploy(TrashReward)
  const instance = await TrashReward.deployed();
  await instance.addContainer(container, 1, 1);
  await web3.eth.sendTransaction({
    from: other,
    to: instance.address,
    value: web3.utils.toWei("50"),
  })
}
