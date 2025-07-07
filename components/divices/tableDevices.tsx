"use client";
import React from "react";
import type { SVGProps } from "react";
import type { ChipProps } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  Selection,
} from "@heroui/react";
import EditModal from "./editModa";

// ================= ICONS ==================
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const DeleteIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    width="1em"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const EditIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    width="1em"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

// ================ TABLE LOGIC =================

const getStatusInfo = (inventory: number) => {
  if (inventory < 10) return { label: "Thấp", color: "danger" as const };
  if (inventory <= 50)
    return { label: "Trung bình", color: "warning" as const };
  return { label: "Còn nhiều", color: "success" as const };
};

type DeviceItem = {
  _id: string;
  tenVatDung: string;
  loai: string;
  tonKho: number;
  donVi: string;
  nhaCungCap: string;
  stt?: number;
};

const columns = [
  { key: "stt", label: "STT" },
  { key: "tenVatDung", label: "Tên vật dụng" },
  { key: "loai", label: "Loại" },
  { key: "tonKho", label: "Tồn kho" },
  { key: "donVi", label: "Đơn vị" },
  { key: "nhaCungCap", label: "Nhà cung cấp" },
  { key: "status", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
];

export default function TableDevices({ reload }: { reload: boolean }) {
  const [data, setData] = React.useState<DeviceItem[]>([]);
  const [page, setPage] = React.useState(1);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const [editItem, setEditItem] = React.useState<DeviceItem | null>(null);

  const rowsPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dungcusudung/get-dungcusudung?page=${page}&limit=${rowsPerPage}`
      );
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Lỗi khi fetch dữ liệu:", err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [page, reload]);

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data
      .slice(start, start + rowsPerPage)
      .map((item, index) => ({ ...item, stt: start + index + 1 }));
  }, [data, page]);

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá vật dụng này?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dungcusudung/delete-dungcusudung/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Xoá thất bại");
      fetchData(); // reload lại dữ liệu
    } catch (err) {
      alert("Xoá thất bại");
      console.error(err);
    }
  };

  const renderCell = React.useCallback(
    (item: DeviceItem, columnKey: React.Key) => {
      switch (columnKey) {
        case "stt":
          return item.stt;
        case "status":
          const statusInfo = getStatusInfo(item.tonKho);
          return (
            <Chip
              className="capitalize"
              color={statusInfo.color}
              size="sm"
              variant="flat"
            >
              {statusInfo.label}
            </Chip>
          );
        case "action":
          return (
            <div className="flex items-center justify-center gap-2">
              <Tooltip content="Chỉnh sửa">
                <span
                  onClick={() => setEditItem(item)}
                  className="text-lg text-default-400 cursor-pointer"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  onClick={() => handleDelete(item._id)}
                  className="text-lg text-danger cursor-pointer"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return item[columnKey as keyof DeviceItem];
      }
    },
    []
  );

  return (
    <div className="space-y-4 min-h-screen">
      <Table
        aria-label="Danh sách thiết bị"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{ wrapper: "min-h-[650px]" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="center">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdated={() => {
            fetchData();
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
