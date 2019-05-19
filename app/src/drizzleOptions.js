import Web3 from 'web3'
import TrashReward from './contracts/TrashReward.json'

const options = {
  web3: {
    customProvider: new Web3('http://localhost:8545')
  },
  events: {
    TrashReward: [
      {
        eventName: 'ContainerAdded',
        eventOptions: { fromBlock: 0 }
      },
      {
        eventName: 'CitizenRewarded',
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
