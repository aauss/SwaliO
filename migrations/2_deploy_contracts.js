const TrashReward = artifacts.require('TrashReward')

module.exports = function(deployer) {
  deployer.deploy(TrashReward)
}
