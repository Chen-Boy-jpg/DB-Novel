import {
  Box,
  Button,
  Input,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createAuthor, getAuthor, getProfile, logout } from "./service/request";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";

const Header = () => {
  const toast = useToast();
  const router = useRouter();
  const leftDrawer = useDisclosure(); // 控制左侧 Drawer 的状态
  const [authorTrigger, setAuthorTrigger] = useState(false);
  const { data } = useQuery("member", getProfile, {
    onSuccess: (res) => {
      localStorage.setItem("memberData", JSON.stringify(res));
    },
    retry: false,
  });

  const logoutMutation = useMutation(["logout"], logout, {
    retry: false,
    onSuccess: () => router.push("/login"),
  });

  const authorMutation = useMutation(["author"], createAuthor, {
    retry: false,
    onSuccess: (res) => {
      toast({
        title: "創建成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAuthorTrigger(true);
    },
  });

  const {} = useQuery("author", () => getAuthor(), {
    retry: false,
    onSuccess: (res) => {
      const author = res.authors.find(
        (author) => author.aName.toString() === data?.mName.toString()
      );
      if (author) {
        console.log("find");
        setAuthorTrigger(true);
      }
    },
    onError: (err) => {
      setAuthorTrigger(false);
    },
  });

  return (
    <Box
      w={"95%"}
      h={"4.5rem"}
      borderRadius={"3rem"}
      bgColor={"white"}
      position={"fixed"}
      left={"50%"}
      transform={"translateX(-50%)"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={2}
      pr={2}
      shadow={"base"}
      zIndex={"9999"}
    >
      <Button
        variant={"outline"}
        border={"3px solid #3AB19B"}
        h={"90%"}
        borderRadius={"3rem"}
        color={"#3AB19B"}
        fontSize={"2.5rem"}
        onClick={leftDrawer.onOpen}
      >
        Novel
      </Button>

      <Input w={"30%"} bgColor={"#ECEFF6"} />
      <Box display={"flex"} gap={"1rem"} h={"100%"} alignItems={"center"}>
        <Button
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          h={"90%"}
          variant={"outline"}
          borderRadius={"3rem"}
          color={"#3AB19B"}
          fontSize={"1.5rem"}
          onClick={() => authorMutation.mutate(data?.mName)}
          disabled={data?.is_super_admin || authorTrigger}
        >
          一鍵成為創作者
        </Button>
        <Button
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          h={"90%"}
          variant={"outline"}
          borderRadius={"3rem"}
          color={"#3AB19B"}
          fontSize={"2.5rem"}
          onClick={() => {
            if (window.confirm("確定要登出??")) {
              logoutMutation.mutate();
            }
          }}
        >
          <Avatar>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box fontSize={"1.5rem"} fontWeight={600}>
            {data?.mName}
          </Box>
        </Button>
      </Box>

      <Drawer
        isOpen={leftDrawer.isOpen}
        placement="left"
        onClose={leftDrawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box
              color={"#3AB19B"}
              fontSize={"3rem"}
              fontWeight={"600"}
              display={"flex"}
              justifyContent={"center"}
            >
              Novel
            </Box>
          </DrawerHeader>
          <DrawerBody m={0} p={0} mt={"5rem"}>
            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
              onClick={() => router.push("/home")}
              disabled={data?.is_super_admin}
            >
              Home
            </Button>
            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
              onClick={() => router.push("/bookshell")}
              disabled={data?.is_super_admin}
            >
              Bookshell
            </Button>

            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
              onClick={() => router.push("/author")}
              disabled={data?.is_super_admin || !authorTrigger}
            >
              Author
            </Button>
            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
              onClick={() => router.push("/cms")}
              disabled={!data?.is_super_admin}
            >
              CMS
            </Button>
            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
              onClick={() => router.push("/analyze")}
              disabled={!data?.is_super_admin}
            >
              Analyze
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
