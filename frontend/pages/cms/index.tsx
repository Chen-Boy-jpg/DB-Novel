import { Box, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllAuthor, getAllNovel } from "../api/home.request";
import { NovelType } from "@/libs/type";
import DataTable from "./components/Table/DataTable";
import { NovelTableColumns } from "./components/Table/column";

const CMS = () => {
  const [novelList, setNovelList] = useState<NovelType[]>([]);
  const {} = useQuery(["novel"], getAllNovel, {
    retry: false,
    onSuccess: (res) => {
      setNovelList(res?.novel);
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
        gap={"2rem"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Box fontSize={"2rem"} fontWeight={"800"}>
          小說列表
        </Box>
        <DataTable
          columns={NovelTableColumns({ setNovelList })}
          data={novelList}
        />
      </Box>
    </HStack>
  );
};

export default CMS;
