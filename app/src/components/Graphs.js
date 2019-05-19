import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Box } from 'grommet'
import { PieChart, LineChart } from 'rd3'
import Web3 from 'web3'
import { fromWei } from 'web3-utils'

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

export default withRouter(({ history, events, pieValues }) => {
  const [lineData, setLineData] = useState([
    { values: [{ x: 1, y: 1 }, { x: 2, y: 4 }] }
  ])

  useEffect(
    () => {
      async function fetchLineData() {
        let values = []

        for (const event of events) {
          const block = await web3.eth.getBlock(event.blockHash)
          const date = new Date(block.timestamp)
          values.push({
            x: date.getMinutes() + date.getSeconds(),
            y: fromWei(event.returnValues[0], 'ether') * 10000
          })
        }

        if (values.length) {
          setLineData([
            {
              name: 'test',
              values
            }
          ])
        }
      }
      fetchLineData()
    },
    [events]
  )

  console.log(lineData)

  return (
    <Box align={'center'} pad={'large'}>
      <PieChart
        data={pieValues}
        width={320}
        height={300}
        radius={100}
        innerRadius={20}
        title="Bottles per Interaction"
      />
      <LineChart
        width={520}
        height={300}
        data={lineData}
        tite="Usage over time"
        xAxisLabel="time"
        yAxisLabel="usage"
        gridHorizontal={true}
      />
    </Box>
  )
})
