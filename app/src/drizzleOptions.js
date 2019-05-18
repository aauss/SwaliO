import TrashReward from './contracts/TrashReward.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'http',
      url: 'http://127.0.0.1:8545'
    }
  },
  contracts: [TrashReward],
  polls: {
    accounts: 1500
  }
}

export default options
