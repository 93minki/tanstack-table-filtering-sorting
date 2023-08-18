"use client";

import { tableDataType } from "@/utils/TableData";
import { flexRender, Header } from "@tanstack/react-table";
import { useMemo } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const TableHeader = ({
  header,
}: {
  header: Header<tableDataType, unknown>;
}) => {
  const sortedUniqueValues = useMemo(
    () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
    [header.column]
  );

  const onFilterChange = (value: string | number) => {
    if (value === "null") {
      header.column.setFilterValue(null);
    } else {
      header.column.setFilterValue(String(value));
    }
  };

  return (
    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
      <div>
        <div>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getIsSorted() ===
          false ? null : header.column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )}
          {header.column.getCanSort() && !header.column.getIsSorted() ? (
            <FaSort />
          ) : null}
        </div>
        <div>
          {header.column.getCanFilter() ? (
            <select
              onChange={({ currentTarget: { value } }) => onFilterChange(value)}
            >
              <option value="null">선택 안함</option>
              {sortedUniqueValues.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          ) : null}
        </div>
      </div>
    </th>
  );
};

export default TableHeader;
