import React from "react";
import { useQuery } from "react-query";
import { getAllNovel, getProfile } from "../api/home.request";
import { Box, HStack } from "@chakra-ui/react";
import Card from "./components/card";
import { getAllAuthor } from "../api/author.request";

const Home = () => {
  const { data } = useQuery(["novel"], getAllNovel, { retry: false });
  const { data: authorList } = useQuery(["author-all"], getAllAuthor, {
    retry: false,
  });
  return (
    <HStack w={"100%"} h={"100%"} bgColor={"#ECEFF6"} pt={"10rem"}>
      <Box
        w={"100%"}
        display={"flex"}
        gap={"1rem"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={"2rem"}
      >
        <Box w={"80%"} fontSize={"3rem"}>
          All Novel
        </Box>
        <Box
          w={"80%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          shadow={"lg"}
          borderRadius={"1rem"}
          gap={"1rem"}
          alignItems={"center"}
          p={10}
        >
          {data?.novel.map((item) => (
            <Card key={item.desc} data={item} authors={authorList?.authors} />
          ))}
        </Box>
      </Box>
    </HStack>
  );
};

export default Home;
