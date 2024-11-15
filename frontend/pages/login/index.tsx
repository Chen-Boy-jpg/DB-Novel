import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

import React from "react";

const Login = () => {
  return (
    <form>
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
          maxW={"1540px"}
          h={"80%"}
          maxH={"1000px"}
          display={"flex"}
          shadow={"lg"}
          borderRadius={"2rem"}
          overflow={"hidden"}
        >
          <Box
            h={"100%"}
            w={"60%"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-around"}
            bgColor={"white"}
            color={"#3AB19B"}
          >
            <Box fontSize={"5rem"} h={"20%"} fontWeight={800}>
              NOVEL
            </Box>
            <FormControl w={"80%"}>
              <Input
                placeholder="Account"
                variant={"flushed"}
                fontSize={"1.5rem"}
                bgColor={"#F4F8F7"}
                p={"1rem"}
                letterSpacing={"5px"}
              />
            </FormControl>
            <FormControl w={"80%"}>
              <Input
                type="password"
                variant={"flushed"}
                placeholder="Password"
                fontSize={"1.5rem"}
                bgColor={"#F4F8F7"}
                p={"1rem"}
                letterSpacing={"5px"}
              />
            </FormControl>

            <Button
              color={"white"}
              bgColor={"#3AB19B"}
              borderRadius={"10rem"}
              w={"50%"}
              h={"5rem"}
              fontSize={"1.5rem"}
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              SIGN IN
            </Button>
          </Box>

          <Box
            w={"40%"}
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
    </form>
  );
};

export default Login;
