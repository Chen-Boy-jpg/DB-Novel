import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getAllAuthor } from "../home/service";

const NovelPage = () => {
  const router = useRouter();
  const { data } = router.query;
  const { data: authorList } = useQuery(["author"], getAllAuthor, {
    retry: false,
  });
  const parsedData = data ? JSON.parse(data as string) : {};

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
              ).aName
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
        <VStack spacing={4}>
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={() => router.push("/home")}
          >
            返回小說列表
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={() => alert(`前往章節: ${parsedData.chapter}`)}
          >
            閱讀章節 {parsedData.chapter}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default NovelPage;
