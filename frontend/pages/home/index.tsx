import React from "react";
import { useQuery } from "react-query";
import { getAllNovel, getAllAuthor, getProfile } from "./service";
import { Box, HStack } from "@chakra-ui/react";
import Card from "./components/card";

const Home = () => {
  const { data } = useQuery(["novel"], getAllNovel, { retry: false });
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });
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
          {data?.novel.map((item) => (
            <Card data={item} authors={authorList?.authors} />
          ))}
        </Box>
      </Box>
    </HStack>
  );
};

export default Home;
