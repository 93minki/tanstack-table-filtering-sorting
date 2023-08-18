"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { tableData, tableDataType } from "@/utils/TableData";
import TableHeader from "./TableHeader";

const Table = () => {
  const [data] = useState([...tableData]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<tableDataType>();
  const columns = [
    columnHelper.accessor("name", {
      header: "이름",
      filterFn: "auto",
      size: 60,
    }),
    columnHelper.accessor("phone", {
      header: "휴대폰",
      enableColumnFilter: false,
      size: 300,
      enableSorting: false,
      cell: ({ getValue }) =>
        getValue()?.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3"),
    }),
    columnHelper.accessor("birth", {
      header: "생년월일",
      enableColumnFilter: false,
      size: 80,
    }),
    columnHelper.accessor("register_date", {
      header: "등록일",
      enableColumnFilter: false,
      size: 120,
    }),
    columnHelper.accessor("last_edit_date", {
      header: "최종수정일",
      enableColumnFilter: false,
      size: 120,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <input
        type="text"
        value={globalFilter ?? ""}
        onChange={(value) => {
          console.log("onChange value", value.currentTarget.value);
          setGlobalFilter(String(value.currentTarget.value));
        }}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader header={header} key={header.id} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="btn-blue"
      >
        {"<"}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="btn-red"
      >
        {">"}
      </button>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Table;
