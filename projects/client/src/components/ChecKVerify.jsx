import { Box, Button, Text } from "@chakra-ui/react";

export const ChecKVerify = ({ checkEscape, navigate }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      pr={"6"}
      pl={"12"}
      pt="2"
    >
      <Box>
        Your account is not verified yet,{" "}
        <Text
          as={"span"}
          onClick={() => navigate("/profile/settings")}
          textDecoration={"underline"}
          color={"rgb(213, 75, 121)"}
          cursor={"pointer"}
        >
          verify now
        </Text>
      </Box>
      <Box>
        <Button
          variant={"link"}
          color={"inherit"}
          _active={{ color: "rgb(213, 75, 121)" }}
          onClick={() => checkEscape()}
        >
          Not Now
        </Button>
      </Box>
    </Box>
  );
};
