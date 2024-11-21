import {
  Box,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "./components/card.tsx";
import { useMutation, useQuery } from "react-query";
import { createNovel, getNovelWithAuthor } from "./service/request";
import { getAllAuthor } from "../home/service/";

export const Author = () => {
  const toast = useToast();
  const [desc, setDesc] = useState("");
  const [nName, setnName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const createNovelMutation = useMutation(["novel"], createNovel, {
    onSuccess: (res) => {
      toast({
        title: "新增成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "新增失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
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
          <Button size={"lg"} colorScheme="green" onClick={onOpen}>
            ADD NOVEL
          </Button>
        </Box>

        <Box
          w={"100%"}
          bgColor={"white"}
          display={"flex"}
          justifyContent={"flex-start"}
          gap={"1rem"}
          alignItems={"center"}
          flexWrap={"wrap"}
          p={10}
        >
          {novelList?.novels.map((item) => (
            <Card key={item.aId} data={item} authors={authorList?.authors} />
          ))}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>新增小說</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl w={"50%"}>
                <FormLabel>小說名稱</FormLabel>
                <Input onChange={(e) => setnName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>小說敘述</FormLabel>
                <Textarea onChange={(e) => setDesc(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={createNovelMutation.isLoading}
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  const memberData = localStorage.getItem("memberData");
                  const parsedData = JSON.parse(memberData as string);
                  const aId = authorList.authors.find(
                    (item) => item.aName == parsedData.mName
                  ).aId;
                  const data = {
                    chapter: "1",
                    aId: aId,
                    desc: desc,
                    nName: nName,
                    isSubscribe: true,
                  };
                  createNovelMutation.mutate(data);
                  setDesc("");
                  setnName("");
                  onClose();
                }}
              >
                送出
              </Button>
              <Button variant={"solid"} mr={3} onClick={onClose}>
                關閉
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default Author;
