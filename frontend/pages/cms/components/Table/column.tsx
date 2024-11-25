import React, { useState } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";

import {
  Box,
  Button,
  Flex,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { NovelType } from "@/libs/type";
import { EditIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import { deleteNovel, updateNovel } from "@/pages/api/novel.request";

type EditSwitchProps = {
  value: boolean;
  row: Row<NovelType>;
  setNovelList: React.Dispatch<React.SetStateAction<NovelType[]>>;
};

const EditSwitch = ({ value, row, setNovelList }: EditSwitchProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [novel, setNovel] = useState(row.original);
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
      const data = novel;
      toast({
        title: "更改成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setNovelList((prevList) =>
        prevList.map((novel) =>
          novel.nId === row.original.nId &&
          novel.chapter === row.original.chapter
            ? { ...novel, ...data }
            : novel
        )
      );
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
      setNovelList((prevList) =>
        prevList.filter(
          (novel) =>
            novel.nId !== row.original.nId ||
            novel.chapter !== row.original.chapter
        )
      );
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

  return (
    <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
      <Box w={"5rem"} isTruncated>
        {value}
      </Box>
      <Button
        colorScheme="blue"
        onClick={() => {
          onOpen();
        }}
      >
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={"5rem"}>
          <ModalHeader>{row.original.nName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={"1rem"}>
            {/* 表單：小說名稱 */}
            <FormControl>
              <FormLabel>小說名稱</FormLabel>
              <Input
                defaultValue={row.original.nName}
                placeholder="輸入小說名稱"
                onChange={(e) => {
                  const data = novel;
                  data.nName = e.target.value;
                  setNovel(data);
                }}
              />
            </FormControl>

            {/* 表單：章節 */}
            <FormControl>
              <FormLabel>章節</FormLabel>
              <Input
                disabled
                defaultValue={row.original.chapter}
                placeholder="輸入章節"
              />
            </FormControl>

            {/* 表單：簡述 */}
            <FormControl>
              <FormLabel>簡述</FormLabel>
              <Textarea
                defaultValue={row.original.desc}
                placeholder="輸入簡述"
                resize="none"
                onChange={(e) => {
                  const data = novel;
                  data.desc = e.target.value;
                  setNovel(data);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Box display={"flex"} gap={"1rem"}>
              <Button
                colorScheme="blue"
                onClick={() => {
                  updateMutation.mutate({
                    data: novel,
                    nId: row.original.nId as string,
                    chapter: row.original.chapter as string,
                  });
                  onClose();
                }}
              >
                儲存
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  const confirm = window.confirm("是否要刪除品項開關");
                  if (confirm) {
                    deleteMutation.mutate({
                      nId: row.original.nId as string,
                      chapter: row.original.chapter as string,
                    });
                  }
                  onClose();
                }}
              >
                刪除
              </Button>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                關閉
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const NovelTableColumns = ({
  setNovelList,
}: {
  setNovelList: React.Dispatch<React.SetStateAction<NovelType[]>>;
}): ColumnDef<NovelType>[] => {
  return [
    {
      accessorKey: "nName",
      enableColumnFilter: true,
      filterFn: "auto",
      header: () => <>小說名稱</>,
      cell: ({ row, getValue }) => {
        return <Box>{getValue() as string}</Box>;
      },
    },
    {
      accessorKey: "chapter",
      enableColumnFilter: false,
      header: () => <>章節</>,
      cell: ({ row, getValue }) => <Box>{getValue() as string}</Box>,
    },
    {
      accessorKey: "desc",
      enableColumnFilter: false,
      header: () => <>簡述</>,
      cell: ({ getValue, row, column }) => (
        <EditSwitch
          value={getValue() as boolean}
          row={row}
          setNovelList={setNovelList}
        />
      ),
    },
  ];
};
