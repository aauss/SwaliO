import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Box, Button, Heading, Text, TextInput } from "grommet";

import { postToEndpoint } from "../helpers/fetch";

export default withRouter(({ history }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const handleClickGo = async () => {
    setLoading(true);
    await postToEndpoint("/start", { address })
    setTimeout(() => {
      setLoading(false);
      history.push("/process", { address })
    }, 1000);
  };

  return (
    <Box align={"center"} pad={"large"}>
      <Heading>
        Hello.
      </Heading>
      <Box pad={"large"}>
        <Text size={"xlarge"}>
          Enter your address to get started
        </Text>
      </Box>
      <Box width={"large"}>
        <TextInput
          placeholder={"0x..."}
          size={"xlarge"}
          value={address}
          onChange={event => setAddress(event.target.value)}
          disabled={loading}
        />
      </Box>
      <Button
        label={"Let's start"}
        color={"accent-1"}
        primary
        margin={"large"}
        onClick={handleClickGo}
        disabled={loading}
      />
    </Box>
  )
})
