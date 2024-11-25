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
  Image,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "./components/card.tsx";
import { useMutation, useQuery } from "react-query";
import { createNovel, getNovelWithAuthor } from "../api/author.request";
import { getAllAuthor } from "../api/home.request";
import { MemberType, NovelType } from "../../libs/type/";

export const Author = () => {
  const toast = useToast();
  const [desc, setDesc] = useState("");
  const [nName, setnName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });
  const [memberData, setMemberData] = useState<MemberType>();
  const [novelList, setNovelList] = useState<NovelType[]>([]);
  const [currentNovel, setCurrentNovel] = useState<NovelType>({});

  const {} = useQuery(
    ["novel-author"],
    () => {
      const memberData = localStorage.getItem("memberData");
      const parsedData = JSON.parse(memberData as string);
      setMemberData(parsedData);
      return getNovelWithAuthor(parsedData?.mName);
    },
    {
      retry: false,
      onSuccess: (res) => {
        setNovelList(res.novels);
      },
    }
  );

  const createNovelMutation = useMutation({
    mutationFn: ({ data }: { data: any }) => {
      const newList = [...novelList, data];

      setNovelList(newList);
      return createNovel(data);
    },
    onSuccess: (res) => {
      toast({
        title: "新增成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(res);
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
      h={"100%"}
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
        <Box display={"flex"} gap={"1rem"}>
          <Box
            bgColor={"white"}
            h={"100%"}
            w={"20%"}
            p={5}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Image src="/IMG_8628.jpg" alt="" />
            <Tag colorScheme="green" fontSize={"1rem"}>
              {memberData?.mName}
            </Tag>
          </Box>
          <Box
            w={"100%"}
            h={"80%"}
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
            {novelList?.map((item) => (
              <Card key={item.desc} data={item} authors={authorList?.authors} />
            ))}
          </Box>
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

                  createNovelMutation.mutate({ data });

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
