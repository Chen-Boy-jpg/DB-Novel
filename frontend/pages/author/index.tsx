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
} from "@chakra-ui/react";
import React from "react";
import Card from "./components/card.tsx";
import { useQuery } from "react-query";
import { getNovelWithAuthor } from "./service/request";
import { getAllAuthor } from "../home/service/";

export const Author = () => {
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
          justifyContent={"center"}
          gap={"1rem"}
          alignItems={"center"}
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
              <FormControl>
                <FormLabel>小說名稱</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>章節</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>小說敘述</FormLabel>
                <Textarea />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
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
