let MicroFinance = artifacts.require('./MicroFinance.sol')

module.exports = (deployer, network) => {
  deployer.deploy(MicroFinance)
}
