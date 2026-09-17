/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/utils/classNames";
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";

export interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  orderable?: boolean;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  isLoading?: boolean;
  selectedRows?: Set<any>;
  onOrderChange?: (orderBy: string, orderDirection: "asc" | "desc") => void;
  onRowClick?: (row: T) => void;
  headerClassName?: string;
  trClassName?: string;
  getRowClassName?: (row: T) => string;
  scrollContainerHeight?: number;
  scrollContainerClassName?: string;
  cellClassName?: string;
}

const TITLE_OVERLAY = "/images/title_effect_overlay.png";

const Table = <T,>({
  columns,
  data,
  title,
  orderBy,
  orderDirection,
  selectedRows,
  onOrderChange,
  isLoading,
  onRowClick,
  headerClassName,
  trClassName,
  getRowClassName,
  scrollContainerHeight,
  scrollContainerClassName,
  cellClassName,
}: TableProps<T>) => {
  // ========HANDLE ORDER========
  const handleOrder = (col: Column<T>) => {
    if (!col.orderable) return;
    const isAsc = orderBy === col.key && orderDirection === "asc";
    onOrderChange?.(col.key as string, isAsc ? "desc" : "asc");
  };

  // ========GET ALIGN CLASS========
  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      case "center":
      default:
        return "text-center";
    }
  };

  // ========RETURN========
  const tableEl = (
    <table className="w-full border-collapse table-fixed">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key as string}
              className={cn(
                "sticky top-0 z-10 border-b border-r border-[#070a0f] px-5 py-4 text-center text-sm font-medium whitespace-nowrap bg-[#29324b] text-gray last:border-r-0",
                col.orderable ? "cursor-pointer" : "",
                col.headerClassName || "",
                headerClassName || ""
              )}
              style={col.width != null ? { width: col.width, minWidth: col.width, maxWidth: col.width } : undefined}
              onClick={() => (col.orderable ? handleOrder(col) : undefined)}
            >
              <span
                className={`flex items-center gap-1 ${col.orderable ? "justify-between" : "justify-center"}`}
              >
                {col.label}
                {col.orderable &&
                  (orderBy === col.key ? (
                    orderDirection === "asc" ? (
                      <LuArrowUpDown className="w-4.5 h-4 transition-transform duration-200 text-gray" />
                    ) : (
                      <LuArrowDownUp className="w-4.5 h-4 transition-transform duration-200 text-gray" />
                    )
                  ) : (
                    <LuArrowDownUp className="w-4.5 h-4 text-gray/60" />
                  ))}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length} className="h-8">
              <div className="flex justify-center items-center py-12 ">

              </div>
            </td>
          </tr>
        ) : data === null || data?.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center text-base lg:text-xl font-bold text-[#ef7c00] py-8 bg-[#070a0f]"
            >
              기록이 없습니다
            </td>
          </tr>
        ) : (
          data?.map((row, idx) => (
            <tr
              key={(row as any).id ?? idx}
              style={data.length >= 15 ? { contentVisibility: "auto" } : undefined}
              className={cn(
                "text-sm lg:text-base text-gray transition-colors duration-150 bg-[#070a0f]",
                onRowClick ? "cursor-pointer hover:bg-gray-800" : "",
                selectedRows?.has((row as any).id) ? "bg-gray-800" : "",
                trClassName || "",
                getRowClassName?.(row) || ""
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className={cn(`px-3 py-3 ${getAlignClass(col.align)}`, cellClassName || "")}
                  style={col.width != null ? { width: col.width, minWidth: col.width, maxWidth: col.width } : undefined}
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const wrapper = (
    <div className="overflow-hidden">
      {title != null && (
        <div
          className="relative z-10 mb-px flex h-15.5 shrink-0 items-center bg-[#07172d]"
          style={{
            backgroundImage: `url(${TITLE_OVERLAY})`,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span
            className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-gray"
            style={{
              lineHeight: "62px",
              marginLeft: "20px",
              textShadow: "0 0 10px rgb(0 0 0 / 50%)",
            }}
          >
            {title}
          </span>
        </div>
      )}
      {scrollContainerHeight != null ? (
        <div
          className={cn(
            "min-h-0 overflow-auto scrollbar",
            scrollContainerClassName
          )}
          style={{ maxHeight: scrollContainerHeight }}
        >
          {tableEl}
        </div>
      ) : (
        tableEl
      )}
    </div>
  );

  return wrapper;
};

export default Table;
