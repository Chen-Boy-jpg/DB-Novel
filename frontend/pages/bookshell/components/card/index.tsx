import { Box, Button, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Card = ({ data, authors }) => {
  const router = useRouter();
  return (
    <Button
      w={"20%"}
      h={"100%"}
      shadow={"lg"}
      borderRadius={"2rem"}
      bgColor={"white"}
      display={"flex"}
      flexDir={"column"}
      gap={"3rem"}
      p={1}
      _hover={{
        transform: "scale(1.15)", // 放大 1.05 倍
        transition: "transform 0.3s ease-in-out", // 平滑过渡
      }}
      onClick={() => {
        router.push({
          pathname: "/novel",
          query: { data: JSON.stringify(data) },
        });
      }}
    >
      <Img
        src="https://img.freepik.com/premium-photo/notebook-with-orange-cover-icon_53876-84477.jpg?semt=ais_hybrid"
        borderRadius={"2rem 2rem 0 0 "}
      />
      <Box
        ml={"1rem"}
        display={"flex"}
        flexDir={"column"}
        mb={"1rem"}
        w={"100%"}
        alignItems={"flex-start"}
        gap={"1rem"}
      >
        <Box fontSize={"1.3rem"} fontWeight={600}>
          {data?.nName}
        </Box>
        <Box color={"#A8ABB4"} fontSize={"0.8rem"} fontWeight={600}>
          {authors?.find((author) => author.aId === data.aId).aName}
        </Box>
      </Box>
    </Button>
  );
};

export default Card;
