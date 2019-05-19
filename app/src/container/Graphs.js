import GraphComponent from '../components/Graphs'
import { drizzleConnect } from 'drizzle-react'
import { fromWei } from 'web3-utils'

const mapStateToProps = state => {
  const events = state.contracts.TrashReward.events.filter(
    entry => entry.event === 'CitizenRewarded'
  )

  let pieValues = []

  if (events.length) {
    const rewards = events.map(entry => fromWei(entry.returnValues[0], 'ether'))
    let reward_map = {}

    rewards.forEach(reward => {
      if (reward_map[reward]) {
        reward_map[reward] += 1
      } else {
        reward_map[reward] = 1
      }
    })

    pieValues = Object.keys(reward_map).map(
      amount =>
        ({
          label: Math.ceil(amount * 10000),
          value: Math.ceil((reward_map[amount] / rewards.length) * 100)
        })
    )
  }

  return {
    events: events,
    pieValues
  }
}

const GraphContainer = drizzleConnect(GraphComponent, mapStateToProps)

export default GraphContainer
