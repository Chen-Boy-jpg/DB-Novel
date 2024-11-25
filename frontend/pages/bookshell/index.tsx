import { Box, Button, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "./components/card";
import { useMutation, useQuery } from "react-query";
import {
  addBookshell,
  getBookshell,
  getCollectionBymId,
} from "../api/bookshell.request";
import { getAllAuthor } from "../api/home.request";

const Bookshell = () => {
  const [id, setId] = useState("");
  const [bId, setBId] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const createMutation = useMutation(["bookshell"], addBookshell, {
    onSuccess: () => {
      setTrigger(true);
    },
  });
  const [novels, setNovels] = useState([]);

  const {} = useQuery(
    ["collection"],
    () => {
      const memberData = localStorage.getItem("memberData");
      const mId = memberData ? JSON.parse(memberData)?.mId : null;
      return getCollectionBymId(mId);
    },
    {
      retry: false,
      onSuccess: (res) => {
        setNovels(res.novels);
      },
    }
  );
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });

  const {} = useQuery(
    ["bookshell"],
    () => {
      const memberData = localStorage.getItem("memberData");
      const mId = memberData ? JSON.parse(memberData)?.mId : null;
      console.log(mId);
      if (!mId) {
        throw new Error("mId is missing in memberData");
      }
      setId(mId);

      return getBookshell(mId);
    },
    {
      retry: false,
      onSuccess: (res) => {
        setBId(res);
      },
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
        gap={"2rem"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {bId || trigger ? (
          <>
            <Box w={"100%"} fontSize={"3rem"} fontWeight={"600"}>
              My Bookshell
            </Box>
            <Box
              w={"100%"}
              bgColor={"white"}
              display={"flex"}
              shadow={"lg"}
              borderRadius={"1rem"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={"1rem"}
              p={10}
            >
              {novels?.map((item, index) => (
                <Card key={index} data={item} authors={authorList?.authors} />
              ))}
            </Box>
          </>
        ) : (
          <Button
            size={"lg"}
            colorScheme="green"
            onClick={() => {
              createMutation.mutate(id);
            }}
          >
            ADD BOOKSHELL
          </Button>
        )}
      </Box>
    </HStack>
  );
};

export default Bookshell;
