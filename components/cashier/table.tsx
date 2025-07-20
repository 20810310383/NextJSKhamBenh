"use client";
import React, { useEffect, useState } from "react";
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

// 👉 Kiểu dữ liệu
type PhieuKham = {
  _id: string;
  maBenhNhan: string;
  hoTen: string;
  dichVu: string;
  giaTien: number;
  thanhToan?: number;
  tongTienCanTra: number;
  trangThai: string;
};

const columns = [
  { key: "index", label: "STT" },
  { key: "maBenhNhan", label: "Mã BN" },
  { key: "hoTen", label: "Họ tên" },
  { key: "dichVu", label: "Dịch vụ" },
  { key: "giaTien", label: "Giá tiền DV" },
  //   { key: "tongTien", label: "Tổng tiền (DV + PT)" },
  { key: "tongTienCanTra", label: "Tổng tiền cần trả(Dịch vụ + Phẫu thuật)" },

  { key: "trangThai", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
  { key: "thucHien", label: "Thực hiện" },
];

const rowsPerPage = 7;

const CashierTable = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PhieuKham[]>([]);
  const [editItem, setEditItem] = useState<PhieuKham | null>(null);
  const [editForm, setEditForm] = useState<Partial<PhieuKham>>({});

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const items = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Call API khi load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/phieukham/get-phieu-kham`
    );
    const result = await res.json();

    const filtered = result.data.filter((item: any) => {
      const chiDinh = item.chiDinh;
      const trangThai = item.trangThai;

      return (
        (chiDinh === "1" && trangThai === "Đã Hoàn Thành") ||
        (chiDinh === "2" && trangThai === "Đã Hoàn Thành") ||
        chiDinh === "3"
      );
    });

    const list = filtered.map((item: any) => {
      const giaTien = item.tiepDon?.dichVu?.giaTien || 0;
      const thanhToan = item.thanhToan || 0;

      return {
        _id: item._id,
        maBenhNhan: item.tiepDon?.maBenhNhan || "",
        hoTen: item.tiepDon?.hoTen || "",
        dichVu: item.tiepDon?.dichVu?.tenDichVu || "",
        giaTien,
        thanhToan,
        tongTienCanTra: thanhToan !== 0 ? thanhToan : giaTien,
        trangThai:
          item.trangThaiThanhToan === "Đã thanh toán"
            ? "Đã thanh toán"
            : "Chưa thanh toán",
      };
    });

    setData(list);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phiếu khám này?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/delete-phieu-kham/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (result.message === "Xóa thành công") {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    }
  };

  const handlePayment = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/update-payment/${id}`,
        {
          method: "PUT",
        }
      );
      const result = await res.json();

      if (res.ok) {
        setData((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, trangThaiThanhToan: "Đã thanh toán" }
              : item
          )
        );
        alert("✅ Cập nhật trạng thái thanh toán thành công!");
        await fetchData();
      } else {
        alert("❌ Lỗi: " + result.message);
      }
    } catch (err) {
      alert("❌ Lỗi kết nối tới máy chủ");
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "chưa thanh toán":
        return { label: "Chưa thanh toán", color: "warning" as const };
      case "đã thanh toán":
        return { label: "Đã thanh toán", color: "success" as const };
      default:
        return { label: status, color: "default" as const };
    }
  };

  const handleEdit = (item: PhieuKham) => {
    setEditItem(item);
    setEditForm({ ...item });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item._id === editItem?._id ? { ...item, ...editForm } : item
      )
    );
    setEditItem(null);
  };

  const renderCell = (item: PhieuKham, columnKey: React.Key) => {
    switch (columnKey) {
      case "index":
        return (page - 1) * rowsPerPage + data.indexOf(item) + 1;
      case "giaTien":
        return item.giaTien.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      //   case "tongTien":
      //     const total = item.thanhToan || 0;
      //     return total.toLocaleString("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     });
      case "tongTienCanTra":
        return item.tongTienCanTra.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });

      case "trangThai":
        const status = getStatusInfo(item.trangThai);
        return (
          <Chip
            className="capitalize"
            color={status.color}
            size="sm"
            variant="flat"
          >
            {status.label}
          </Chip>
        );
      case "action":
        return (
          <div className="flex justify-center items-center">
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
        return (item as any)[columnKey as string] ?? "";
    }
  };

  return (
    <div className="space-y-4">
      <Table
        aria-label="Danh sách phiếu khám"
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
          <ModalHeader>Chỉnh sửa</ModalHeader>
          <ModalBody>
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
