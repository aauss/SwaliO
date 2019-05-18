import TrashReward from './contracts/TrashReward.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'http',
      url: 'http://127.0.0.1:8545'
    }
  },
  events: {
    TrashReward: [
      'ContainerAdded',
      {
        eventName: 'ContainerAdded',
        eventOptions: { fromBlock: 0 }
      }
    ]
  },
  contracts: [TrashReward],
  polls: {
    accounts: 1500
  }
}

export default options
