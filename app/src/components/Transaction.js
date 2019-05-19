import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text } from "grommet";
import { Money } from "grommet-icons";
import { withRouter } from "react-router-dom";

import { fetchFromEndpoint } from "../helpers/fetch";

export default withRouter(({ history, location }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { address, totalReward } = location.state;
  
  useEffect(() => {
    async function fetchBalance() {
      const balance = await fetchFromEndpoint(`/balance/${address}`);
      setBalance(balance);
    }
    fetchBalance();
  }, [])

  const handleClickEnd = () => {
    history.push("/");
  }

  return (
    <Box align={"center"} pad={"large"}>
      <Heading>
        Transaction sent.
      </Heading>
      <Box
        width={"medium"}
        justify={"center"}
        align={"center"}
        margin={"large"}
      >
        <Money size={"xlarge"} color={"accent-1"} />
      </Box>
      <Box pad={"large"} align={"center"}>
        <Text size={"large"} align={"center"}>
          Successfully sent <Text weight={"bold"}>{totalReward} ETH</Text>
        </Text>
        <Text size={"large"} align={"center"}>
          to <Text weight={"bold"}>{address}</Text>
        </Text>
      </Box>
      <Button
        label={"OK"}
        color={"accent-1"}
        primary
        margin={"large"}
        onClick={handleClickEnd}
      />
    </Box>
  )
})
