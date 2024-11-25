import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Divider,
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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getAllAuthor } from "../api/home.request";
import { addCollection, deleteNovel, updateNovel } from "../api/novel.request";
import { useState, useEffect } from "react";
import { getBookshell } from "../api/bookshell.request";
type Bookshell = {
  bookshells: { bId: string }[];
};

const NovelPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = router.query;
  const [id, setId] = useState("");
  const [bookshell, setBookshell] = useState<Bookshell>({ bookshells: [] });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });
  const parsedData = data ? JSON.parse(data as string) : {};
  const [desc, setDesc] = useState(parsedData?.desc);
  const [nName, setnName] = useState(parsedData?.nName);
  const [editable, setEditable] = useState(false);
  const [trigger, setTrigger] = useState(false);
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
        setBookshell(res);
        setTrigger(true);
      },
      onError: (err) => {
        setTrigger(false);
      },
    }
  );
  useEffect(() => {
    const aName = authorList?.authors.find(
      (item) => item.aId == parsedData.aId
    )?.aName;
    const memberData = localStorage.getItem("memberData");
    const memberparse = JSON.parse(memberData as string);
    console.log(aName, memberparse.mName);
    if (aName == memberparse.mName) {
      console.log(aName, memberparse.mName);
      setEditable(true);
    }
  }, [authorList, parsedData.aId]);
  const deleteMutation = useMutation({
    mutationFn: ({ nId, chapter }: { nId: string; chapter: string }) =>
      deleteNovel(nId, chapter),
    retry: false,
    onSuccess: (res) => {
      toast({
        title: "刪除成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/author");
    },
    onError: (error) => {
      toast({
        title: "刪除失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({
      data,
      nId,
      chapter,
    }: {
      data: any;
      nId: string;
      chapter: string;
    }) => updateNovel(data, nId, chapter),
    retry: false,
    onSuccess: (res) => {
      toast({
        title: "更改成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/author");
    },
    onError: (error) => {
      toast({
        title: "更改失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const createCollection = useMutation(addCollection, {
    retry: false,
    onSuccess: (res) => {
      toast({
        title: "加入收藏成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "加入收藏失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Box
      w="100%"
      minH="100vh"
      bgGradient="linear(to-br, gray.200, white)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={"5rem"}
    >
      <Box
        w={["90%", "80%", "60%"]}
        maxW="800px"
        bg="white"
        shadow="2xl"
        borderRadius="lg"
        overflow="hidden"
        p={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        {/* 封面圖片 */}
        <Image
          src="https://img.freepik.com/premium-photo/notebook-with-orange-cover-icon_53876-84477.jpg?semt=ais_hybrid"
          alt={parsedData?.nName}
          w={["70%", "50%"]}
          mb={6}
          borderRadius="lg"
          boxShadow="md"
        />

        {/* 小說標題 */}
        <Text fontSize="3xl" fontWeight="bold" mb={4} color="teal.600">
          {parsedData?.nName as string}
        </Text>

        <Divider borderColor="gray.300" mb={6} />

        {/* 作者與章節 */}
        <HStack spacing={6} mb={6}>
          <Badge
            colorScheme="blue"
            fontSize="lg"
            px={4}
            py={2}
            borderRadius="md"
          >
            作者:
            {
              authorList?.authors?.find(
                (author) => author.aId === parsedData.aId
              )?.aName
            }
          </Badge>
          <Badge
            colorScheme="purple"
            fontSize="lg"
            px={4}
            py={2}
            borderRadius="md"
          >
            章節: {parsedData.chapter}
          </Badge>
        </HStack>

        {/* 小說簡介 */}
        <Text fontSize="lg" color="gray.700" lineHeight="1.8" mb={8}>
          {parsedData.desc}
        </Text>

        {/* 訂閱狀態 */}
        <Text
          fontSize="lg"
          color={parsedData.isSubscribe ? "green.500" : "red.500"}
          mb={6}
          fontWeight="bold"
        >
          {parsedData.isSubscribe ? "已訂閱" : "未訂閱"}
        </Text>

        <Divider borderColor="gray.300" mb={6} />

        {/* 按鈕操作 */}
        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={() => router.push("/home")}
          >
            返回小說列表
          </Button>
          {editable && (
            <>
              <Button
                colorScheme="red"
                size="lg"
                w="full"
                onClick={() => {
                  window.confirm("確定要刪除小說??");
                  deleteMutation.mutate({
                    nId: parsedData?.nId,
                    chapter: parsedData?.chapter,
                  });
                }}
              >
                刪除小說
              </Button>
              <Button colorScheme="green" size="lg" w="full" onClick={onOpen}>
                更改內容
              </Button>
            </>
          )}
          <Button
            colorScheme="purple"
            size="lg"
            w="full"
            disabled={!trigger}
            onClick={() => {
              if (bookshell) {
                const data = {
                  mId: id,
                  nId: parsedData?.nId,
                  chapter: parsedData?.chapter,
                  bId: bookshell.bookshells[0].bId,
                };

                createCollection.mutate(data);
              }
            }}
          >
            加入收藏
          </Button>
        </HStack>
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
                <Input
                  defaultValue={parsedData?.nName}
                  onChange={(e) => setnName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>小說敘述</FormLabel>
                <Textarea
                  defaultValue={parsedData?.desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={updateMutation.isLoading}
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  const data = {
                    desc: desc,
                    nName: nName,
                  };
                  updateMutation.mutate({
                    data: data,
                    nId: parsedData?.nId,
                    chapter: parsedData?.chapter,
                  });

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
    </Box>
  );
};

export default NovelPage;
