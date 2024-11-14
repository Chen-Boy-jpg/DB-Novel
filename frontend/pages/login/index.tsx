import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"#F2ECEC"}
    >
      <Box
        w={"80%"}
        h={"80%"}
        display={"flex"}
        shadow={"lg"}
        borderRadius={"2rem"}
        overflow={"hidden"}
      >
        <Box
          w={"70%"}
          h={"100%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box w={"80%"} h={"80%"}>
            <form action="">
              <Box
                display={"flex"}
                flexDir={"column"}
                gap={"5rem"}
                alignItems={"center"}
                color={"#3AB19B"}
              >
                <Box fontSize={"5rem"} fontWeight={800}>
                  NOVEL
                </Box>
                <Input
                  placeholder="Account"
                  w={"50rem"}
                  variant={"flushed"}
                  h={"3rem"}
                  fontSize={"1.5rem"}
                  bgColor={"#F4F8F7"}
                  p={"1rem"}
                  letterSpacing={"5px"}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  w={"50rem"}
                  h={"3rem"}
                  fontSize={"1.5rem"}
                  bgColor={"#F4F8F7"}
                  p={"1rem"}
                  letterSpacing={"5px"}
                />
                <Button
                  mt={"2rem"}
                  bgColor={"#3AB19B"}
                  borderRadius={"10rem"}
                  w={"20rem"}
                  h={"5rem"}
                  fontSize={"1.5rem"}
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                >
                  SIGN IN
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Box
          w={"30%"}
          h={"100%"}
          bgColor={"#3AA9AB"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2rem"}
        >
          <Box fontSize={"3rem"} color={"white"} fontWeight={800}>
            Hello ,friend
          </Box>
          <Box fontSize={"1rem"} color={"white"} fontWeight={600}>
            Enter your personal information
          </Box>
          <Button
            variant={"outline"}
            fontSize={"1.5rem"}
            color={"white"}
            h={"4rem"}
            w={"10rem"}
            fontWeight={600}
            borderRadius={"10rem"}
            _hover={{
              transform: "scale(1.05)",
              bgColor: "white",
              color: "#3AB19B",
            }}
          >
            SIGN UP
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
