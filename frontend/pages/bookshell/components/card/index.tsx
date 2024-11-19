import { Box, Img } from "@chakra-ui/react";
import React from "react";

const Card = () => {
  return (
    <Box
      w={"20rem"}
      shadow={"lg"}
      borderRadius={"2rem"}
      bgColor={"white"}
      display={"flex"}
      flexDir={"column"}
      gap={"2rem"}
      _hover={{
        transform: "scale(1.15)", // 放大 1.05 倍
        transition: "transform 0.3s ease-in-out", // 平滑过渡
      }}
    >
      <Img src="https://bit.ly/dan-abramov" borderRadius={"2rem 2rem 0 0 "} />
      <Box ml={"1rem"} display={"flex"} flexDir={"column"} mb={"1rem"}>
        <Box fontSize={"1.3rem"} fontWeight={600}>
          The Psychology of......
        </Box>
        <Box color={"#A8ABB4"} fontSize={"0.8rem"} fontWeight={600}>
          The Psychology of......
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
