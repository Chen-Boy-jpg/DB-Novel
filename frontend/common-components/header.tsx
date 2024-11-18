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
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={"95%"}
      h={"5rem"}
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
    >
      <Button
        variant={"outline"}
        border={"3px solid #3AB19B"}
        w={"10%"}
        h={"90%"}
        borderRadius={"3rem"}
        color={"#3AB19B"}
        fontSize={"2.5rem"}
        onClick={onOpen}
      >
        Novel
      </Button>
      <Input w={"30%"} bgColor={"#ECEFF6"} />
      <Button
        display={"flex"}
        alignItems={"center"}
        gap={"1rem"}
        w={"10%"}
        h={"90%"}
        variant={"outline"}
        border={"3px solid #3AB19B"}
        borderRadius={"3rem"}
        color={"#3AB19B"}
        fontSize={"2.5rem"}
      >
        <Avatar>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Box fontSize={"1.5rem"} fontWeight={600}>
          Dainel
        </Box>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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

          <DrawerBody m={0} p={0}>
            <Button
              h={"5rem"}
              w={"100%"}
              bgColor={"white"}
              fontSize={"2rem"}
              fontWeight={"600"}
              variant={"ghost"}
            >
              Home
            </Button>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
