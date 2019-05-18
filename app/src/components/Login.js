import React, { useState } from "react";
import { Box, Button, Heading, Text, TextInput } from "grommet";

export default ({ loading, onClickGo }) => {
  const [address, setAddress] = useState(null);

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
        onClick={() => onClickGo(address)}
        disabled={loading}
      />
    </Box>
  )
}
