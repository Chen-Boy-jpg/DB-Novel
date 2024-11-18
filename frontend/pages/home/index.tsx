import React from "react";
import { useQuery } from "react-query";
import { getProfile } from "./service";
import { Box, HStack } from "@chakra-ui/react";
import Card from "./components/card";

const Home = () => {
  //   const {} = useQuery(["profile"], getProfile);
  return (
    <HStack w={"100%"} h={"100%"} bgColor={"#ECEFF6"} pt={"10rem"}>
      <Box
        w={"100%"}
        h={"100%"}
        display={"flex"}
        gap={"2rem"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"space-around"}
          shadow={"lg"}
          borderRadius={"1rem"}
          alignItems={"center"}
          p={10}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </Box>
        <Box
          w={"70%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"space-around"}
          shadow={"lg"}
          borderRadius={"1rem"}
          alignItems={"center"}
          p={10}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </Box>
        <Box
          w={"70%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"space-around"}
          shadow={"lg"}
          borderRadius={"1rem"}
          alignItems={"center"}
          p={10}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </Box>
      </Box>
    </HStack>
  );
};

export default Home;
