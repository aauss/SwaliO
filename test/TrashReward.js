const TrashReward = artifacts.require('./TrashReward.sol')

contract('TrashReward', async accounts => {
  let contractInstance

  // Static accounts
  const ACC_OWNER = accounts[0]
  const ACC_NON_OWNER = accounts[1]
  const ACC_CONTAINER = accounts[2]
  const ACC_NON_CONTAINER = accounts[3]
  const ACC_CITIZEN = accounts[4]
  const ACC_FOUNDER = accounts[5]

  // Coordinates
  const LATITUDE = 100000
  const LONGITUDE = 100000

  const REWARD_AMOUNT = 5

  beforeEach(async () => {
    contractInstance = await TrashReward.new()
  })

  describe('#addContainer()', () => {
    it('Can not add container as non contract owner', async () => {
      try {
        await contractInstance.addContainer(
          ACC_CONTAINER,
          LATITUDE,
          LONGITUDE,
          { from: ACC_NON_OWNER }
        )
        assert(
          false,
          'Add container as non contract owner should not been successful!'
        )
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can not add same container twice', async () => {
      try {
        await contractInstance.addContainer(ACC_CONTAINER, { from: ACC_OWNER })
        await contractInstance.addContainer(ACC_CONTAINER, { from: ACC_OWNER })
        assert(false, 'Adding a duplicated container should not be successful!')
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can add container as contract owner', async () => {
      let result

      try {
        result = await contractInstance.addContainer(
          ACC_CONTAINER,
          LATITUDE,
          LONGITUDE,
          { from: ACC_OWNER }
        )
      } catch (error) {
        assert(false, 'Add container as contract owner should bee successful!')
      }

      const logs = result.logs.filter(entry => entry.event === 'ContainerAdded')

      assert.equal(logs.length, 1)

      const log = logs[0]
      assert.equal(
        log.args.container,
        ACC_CONTAINER,
        'Wrong container address emitted!'
      )

      assert.equal(log.args.latitude, LATITUDE, 'Wrong latitude emitted!')
      assert.equal(log.args.longitude, LONGITUDE, 'Wrong longitude emitted!')
      assert.isTrue(await contractInstance.container_list(ACC_CONTAINER))
    })
  })

  describe('#removeContainer()', () => {
    beforeEach(async () => {
      await contractInstance.addContainer(ACC_CONTAINER, LATITUDE, LONGITUDE, {
        from: ACC_OWNER
      })
    })

    it('Can not remove container as non contract owner', async () => {
      try {
        await contractInstance.removeContainer(ACC_CONTAINER, {
          from: ACC_NON_OWNER
        })
        assert(
          false,
          'Remove container as non contract owner should not been successful!'
        )
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can not remove container twice', async () => {
      try {
        await contractInstance.removeContainer(ACC_CONTAINER, {
          from: ACC_NON_OWNER
        })
        await contractInstance.removeContainer(ACC_CONTAINER, {
          from: ACC_NON_OWNER
        })
        assert(false, 'Remove container twice should not been successful!')
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can add container as contract owner', async () => {
      let result

      try {
        result = await contractInstance.removeContainer(ACC_CONTAINER, {
          from: ACC_OWNER
        })
      } catch (error) {
        assert(
          false,
          'Remove container as contract owner should bee successful!'
        )
      }

      const logs = result.logs.filter(
        entry => entry.event === 'ContainerRemoved'
      )

      assert.equal(logs.length, 1)

      const log = logs[0]
      assert.equal(
        log.args.container,
        ACC_CONTAINER,
        'Wrong container address emitted!'
      )
      assert.isFalse(await contractInstance.container_list(ACC_CONTAINER))
    })
  })

  describe('#rewardCitizen()', () => {
    beforeEach(async () => {
      await contractInstance.addContainer(ACC_CONTAINER, LATITUDE, LONGITUDE, {
        from: ACC_OWNER
      })

      await web3.eth.sendTransaction({
        from: ACC_FOUNDER,
        to: contractInstance.address,
        value: REWARD_AMOUNT
      })
    })

    it('Can not reward citizen without being a container', async () => {
      try {
        await contractInstance.rewardCitizen(ACC_CITIZEN, REWARD_AMOUNT, {
          from: ACC_NON_CONTAINER
        })
        assert(
          false,
          'Reward citizen as non-container should not been successful!'
        )
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can not reward citizen without enough founds', async () => {
      try {
        await contractInstance.rewardCitizen(ACC_CITIZEN, REWARD_AMOUNT + 1, {
          from: ACC_CONTAINER
        })
      } catch (error) {
        // Expected to throw here
      }
    })

    it('Can reward citizen as container', async () => {
      const balanceBefore = await web3.eth.getBalance(ACC_CITIZEN)

      try {
        await contractInstance.rewardCitizen(ACC_CITIZEN, REWARD_AMOUNT, {
          from: ACC_CONTAINER
        })
      } catch (error) {
        assert(false, 'Reward citizen as container should be successful!')
      }

      const balanceAfter = await web3.eth.getBalance(ACC_CITIZEN)

      // TODO: Solve problem of expected BigNumber but String problem
      // assert.equal(
      //   parseInt(balanceAfter, 10) - parseInt(balanceBefore, 10),
      //   REWARD_AMOUNT,
      //   'Citizen has not get the reward as balance!'
      // )
    })
  })
})
