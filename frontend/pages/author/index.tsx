import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import Card from "./components/card.tsx";
import { useQuery } from "react-query";
import { getNovelWithAuthor } from "./service/request";
import { getAllAuthor } from "../home/service/";

export const Author = () => {
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });
  const { data: novelList } = useQuery(
    ["novel-author"],
    () => {
      const memberData = localStorage.getItem("memberData");
      const parsedData = JSON.parse(memberData as string);

      return getNovelWithAuthor(parsedData?.mName);
    },
    {
      retry: false,
      onSuccess: (res) => {},
    }
  );
  return (
    <HStack
      w={"100%"}
      bgColor={"#ECEFF6"}
      pt={"10rem"}
      pb={"1rem"}
      display={"flex"}
      justify={"center"}
    >
      <Box
        w={"75%"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box fontSize={"2.5rem"}>My Novel</Box>
          <Button size={"lg"} colorScheme="green">
            ADD NOVEL
          </Button>
        </Box>

        <Box
          w={"100%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"center"}
          gap={"1rem"}
          alignItems={"center"}
          p={10}
        >
          {novelList?.novels.map((item) => (
            <Card data={item} authors={authorList?.authors} />
          ))}
        </Box>
      </Box>
    </HStack>
  );
};

export default Author;
