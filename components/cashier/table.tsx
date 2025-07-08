"use client";
import React, { useState } from "react";
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
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & { size?: number };

export const DeleteIcon = (props: IconSvgProps) => (
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

export const EditIcon = (props: IconSvgProps) => (
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

const columns = [
  { key: "index", label: "STT" },
  { key: "maBenhNhan", label: "Mã BN" },
  { key: "hoTen", label: "Họ tên" },
  { key: "dichVu", label: "Dịch vụ" },
  { key: "giaTien", label: "Giá tiền" },
  { key: "trangThai", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
  { key: "thucHien", label: "Thực hiện" },
];

const mockData = [
  {
    _id: "1",
    maBenhNhan: "BN001",
    hoTen: "Nguyễn Văn A",
    dichVu: "Khám tổng quát",
    giaTien: 200000,
    trangThai: "Chưa thanh toán",
  },
  {
    _id: "2",
    maBenhNhan: "BN002",
    hoTen: "Trần Thị B",
    dichVu: "Xét nghiệm máu",
    giaTien: 150000,
    trangThai: "Đã thanh toán",
  },
  {
    _id: "3",
    maBenhNhan: "BN003",
    hoTen: "Lê Văn C",
    dichVu: "Chụp X-quang",
    giaTien: 300000,
    trangThai: "Chưa thanh toán",
  },
];

const getStatusInfo = (status: string) => {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "chưa thanh toán":
      return { label: "Chưa thanh toán", color: "warning" as const };
    case "đã thanh toán":
      return { label: "Đã thanh toán", color: "success" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

const rowsPerPage = 7;

const CashierTable = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(mockData);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const items = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePayment = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, trangThai: "Đã thanh toán" } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      setData((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setEditForm({ ...item });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item._id === editItem._id ? { ...item, ...editForm } : item
      )
    );
    setEditItem(null);
  };

  const renderCell = (item: (typeof mockData)[0], columnKey: React.Key) => {
    switch (columnKey) {
      case "index":
        return (
          (page - 1) * rowsPerPage +
          data.findIndex((d) => d._id === item._id) +
          1
        );
      case "giaTien":
        return item.giaTien.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        });
      case "trangThai":
        const statusInfo = getStatusInfo(item.trangThai);
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
              <span
                onClick={() => handleEdit(item)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(item._id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "thucHien":
        return item.trangThai === "Chưa thanh toán" ? (
          <Button
            color="primary"
            size="sm"
            onClick={() => handlePayment(item._id)}
          >
            Thanh toán
          </Button>
        ) : (
          <Tooltip content="Đã thanh toán">
            <span className="text-green-500">✔</span>
          </Tooltip>
        );
      default:
        return (item as any)[String(columnKey)] ?? "";
    }
  };

  return (
    <div className="space-y-4">
      <Table
        aria-label="Danh sách thanh toán"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={totalPages}
              onChange={setPage}
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

      {/* Modal chỉnh sửa */}
      <Modal isOpen={!!editItem} onOpenChange={() => setEditItem(null)}>
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin</ModalHeader>
          <ModalBody>
            <Input
              label="Mã BN"
              name="maBenhNhan"
              value={editForm.maBenhNhan || ""}
              onChange={handleEditChange}
            />
            <Input
              label="Họ tên"
              name="hoTen"
              value={editForm.hoTen || ""}
              onChange={handleEditChange}
            />
            <Input
              label="Dịch vụ"
              name="dichVu"
              value={editForm.dichVu || ""}
              onChange={handleEditChange}
            />
            <Input
              label="Giá tiền"
              name="giaTien"
              type="number"
              value={editForm.giaTien || ""}
              onChange={handleEditChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setEditItem(null)}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleEditSave}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CashierTable;
