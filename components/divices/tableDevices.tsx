"use client";
import React from "react";
import type { SVGProps } from "react";
import type { ChipProps } from "@heroui/react";
import { Button } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Tooltip,
  Pagination,
  Selection,
} from "@heroui/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
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
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const getStatusInfo = (inventory: number) => {
  if (inventory < 10) {
    return { label: "Thấp", color: "danger" as const };
  } else if (inventory >= 10 && inventory <= 50) {
    return { label: "Trung bình", color: "warning" as const };
  } else {
    return { label: "Còn nhiều", color: "success" as const };
  }
};

const rows = [
  {
    id: "1",
    itemName: "Khẩu trang y tế",
    category: "Tiêu hao",
    inventory: 250,
    unit: "hộp",
    supplier: "MediSupply Co.",
    action: "Xem / Sửa",
  },
  {
    id: "2",
    itemName: "Găng tay latex",
    category: "Tiêu hao",
    inventory: 120,
    unit: "hộp",
    supplier: "HealthPlus",
    action: "Xem / Sửa",
  },
  {
    id: "3",
    itemName: "Bông gòn tiệt trùng",
    category: "Tiêu hao",
    inventory: 80,
    unit: "gói",
    supplier: "SterileGoods",
    action: "Xem / Sửa",
  },
  {
    id: "4",
    itemName: "Dung dịch sát khuẩn",
    category: "Hoá chất",
    inventory: 8,
    unit: "chai",
    supplier: "PureChem",
    action: "Xem / Sửa",
  },
  {
    id: "5",
    itemName: "Mũ chụp đầu",
    category: "Tiêu hao",
    inventory: 150,
    unit: "cái",
    supplier: "SafeWear",
    action: "Xem / Sửa",
  },
  {
    id: "6",
    itemName: "Kính bảo hộ",
    category: "Trang bị",
    inventory: 20,
    unit: "cái",
    supplier: "ProtectEye",
    action: "Xem / Sửa",
  },
  {
    id: "7",
    itemName: "Ghế nha khoa",
    category: "Thiết bị",
    inventory: 5,
    unit: "chiếc",
    supplier: "DentalEquip",
    action: "Xem / Sửa",
  },
  {
    id: "8",
    itemName: "Máy cạo cao răng",
    category: "Thiết bị",
    inventory: 2,
    unit: "chiếc",
    supplier: "SmileTech",
    action: "Xem / Sửa",
  },
  {
    id: "9",
    itemName: "Xăng y tá",
    category: "Trang phục",
    inventory: 60,
    unit: "bộ",
    supplier: "UniformPro",
    action: "Xem / Sửa",
  },
  {
    id: "10",
    itemName: "Khay đựng dụng cụ",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "11",
    itemName: "Khay đựng dụng cụ 2",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "12",
    itemName: "Khay đựng dụng cụ 3",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "13",
    itemName: "Khay đựng dụng cụ 4",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "14",
    itemName: "Khay đựng dụng cụ 5",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "15",
    itemName: "Khay đựng dụng cụ 6",
    category: "Phụ kiện",
    inventory: 30,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
  {
    id: "16",
    itemName: "Khay đựng dụng cụ 7",
    category: "Phụ kiện",
    inventory: 50,
    unit: "cái",
    supplier: "TrayMasters",
    action: "Xem / Sửa",
  },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "itemName", label: "Tên vật dụng" },
  { key: "category", label: "Loại" },
  { key: "inventory", label: "Tồn kho" },
  { key: "unit", label: "Đơn vị" },
  { key: "supplier", label: "Nhà cung cấp" },
  { key: "status", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
];

type DeviceItem = (typeof rows)[0];

export default function TableDevices() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [page, setPage] = React.useState(1);
  const [isClient, setIsClient] = React.useState(false);
  const rowsPerPage = 10;
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page]);

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  const renderCell = React.useCallback(
    (item: DeviceItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof DeviceItem];

      switch (columnKey) {
        case "status":
          const statusInfo = getStatusInfo(item.inventory);
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
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Chỉnh sửa">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <div className="space-y-4 min-h-screen">
      <Table
        aria-label="Danh sách thiết bị nha khoa"
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
        classNames={{
          wrapper: "min-h-[650px]",
        }}
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
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
