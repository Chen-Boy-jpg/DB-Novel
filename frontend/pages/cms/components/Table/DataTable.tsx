/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  Table as TableType,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  Column,
} from "@tanstack/react-table";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const DataTable = <T extends {}>({ columns, data }: DataTableProps<T>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });
  const headerGroups = table.getHeaderGroups();

  return (
    <Table w={"100%"} display={"flex"} flexDir={"column"} gap={"1rems"}>
      <Thead display={"flex"} w={"100%"}>
        {headerGroups.map((headerGroup) => (
          <Tr
            display={"flex"}
            w={"100%"}
            justifyContent={"space-between"}
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <Th key={header.id} border={"none"} w={"20%"}>
                <Flex
                  minHeight={"2rem"}
                  fontSize={"1.1rem"}
                  flexDirection="column"
                  justifyContent={"space-between"}
                >
                  <Box>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Box>
                  {header.column.getCanFilter() && (
                    <Input
                      type="text"
                      size="sm"
                      variant="flushed"
                      value={(header.column.getFilterValue() ?? "") as string}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Search...`}
                    />
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody display={"flex"} w={"100%"} flexDir={"column"} gap={"2rem"}>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            background={"white"}
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            shadow={"base"}
            h={"3.5rem"}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <Td
                  key={cell.id}
                  border={"none"}
                  w={"20%"}
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"1rem"}
                  fontWeight={600}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataTable;
