import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text } from "grommet";

import { fetchFromEndpoint } from "../helpers/fetch";

export default ({ loading, onClickDone, address = "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e" }) => {
  const [reward, setReward] = useState(0);
  const [numberOfBottles, setNumberOfBottles] = useState(0);
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    async function fetchReward() {
      const reward = await fetchFromEndpoint('/reward');
      setReward(reward);
    }
    async function fetchBottles() {
      const numberOfBottles = await fetchFromEndpoint('/bottles');
      setNumberOfBottles(numberOfBottles);
    }
    async function fetchBalance() {
      const balance = await fetchFromEndpoint(`/balance/${address}`);
      setBalance(balance);
    }
    fetchReward();
    fetchBalance();
    const interval = setInterval(() => {
      fetchBottles();
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Box align={"center"} pad={"large"}>
      <Heading>
        Ready.
      </Heading>
      <Box pad={"large"}>
        <Text size={"xlarge"}>
          Throw in only WHITE glass!
        </Text>
      </Box>
      <Box
        width={"medium"}
        direction={"row"}
        justify={"between"}
        align={"center"}
      >
        <Text size={"large"}>
          Address
        </Text>
        <Text size={"xlarge"} truncate margin={{ "left": "medium" }}>
          {address}
        </Text>
      </Box>
      <Box
        width={"medium"}
        direction={"row"}
        justify={"between"}
        margin={{ "top": "small"}}
      >
        <Text size={"large"}>
          Balance
        </Text>
        <Text size={"xlarge"}>
          {`${balance} ETH`}
        </Text>
      </Box>
      <Box
        direction={"row"}
        width={"medium"}
        border={{
          color: "dark-5",
          size: "small",
          side: "bottom"
        }}
        margin={"medium"}
      />     
      <Box
        width={"medium"}
        direction={"row"}
        justify={"between"}
        margin={"small"}
      >
        <Text size={"large"}>
          WHITE glass
        </Text>
        <Text size={"xlarge"}>
          {`${numberOfBottles} x 🍼`}
        </Text>
      </Box>
      <Box
        width={"medium"}
        direction={"row"}
        justify={"between"}
      >
        <Text size={"large"}>
          Reward per bottle
        </Text>
        <Text size={"xlarge"}>
          {reward} ETH
        </Text>
      </Box>
      <Box
        direction={"row"}
        width={"medium"}
        border={{
          color: "dark-5",
          size: "small",
          side: "bottom"
        }}
        margin={"medium"}
      />        
      <Box
        width={"medium"}
        direction={"row"}
        justify={"between"}
      >
        <Text size={"xxlarge"}>
          Total
        </Text>
        <Text size={"xxlarge"}>
          {numberOfBottles * reward} ETH
        </Text>
      </Box>
      <Button
        label={"Done"}
        color={"accent-1"}
        primary
        margin={"large"}
        onClick={() => onClickDone()}
        disabled={loading}
      />
    </Box>
  )
}
