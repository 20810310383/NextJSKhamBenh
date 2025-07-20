"use client";
import React, { useEffect, useState } from "react";
import type { SVGProps } from "react";
import type { Selection } from "@heroui/react";
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
} from "@heroui/react";
import PatientFormEdit from "./patientFormEdit";

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

const getStatusInfo = (status: string) => {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "chờ khám":
      return { label: "Chờ khám", color: "warning" as const };
    case "đã khám":
      return { label: "Đã khám", color: "success" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

const columns = [
  //   { key: "index", label: "STT" },
  { key: "maBenhNhan", label: "Mã bệnh nhân" },
  { key: "hoTen", label: "Họ tên" },
  { key: "email", label: "Email" },
  { key: "soDienThoai", label: "SĐT" },
  { key: "gioiTinh", label: "Giới tính" },
  { key: "canCuocCongDan", label: "CCCD" },
  { key: "diaChi", label: "Địa chỉ" },
  { key: "ngaySinh", label: "Ngày sinh" },
  { key: "doiTuong", label: "Đối tượng" },
  { key: "dichVu", label: "Dịch vụ" },
  { key: "giaTien", label: "Giá tiền" },
  { key: "thoiGianHen", label: "Thời gian hẹn" },
  { key: "noiDung", label: "Nội dung" },
  { key: "bacSi", label: "Bác sĩ" },
  { key: "trangThai", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
];

type TiepDonItem = {
  _id: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  gioiTinh: string;
  canCuocCongDan: string;
  diaChi: string;
  ngaySinh: string;
  doiTuong: string;
  dichVu?: { _id: string; tenDichVu: string; giaTien: string };
  thoiGianHen: string;
  noiDung: string;
  bacSi?: { _id: string; hoTen: string };
  trangThai: string;
};

export default function TableReception({
  refreshFlag,
  searchKeyword,
}: {
  refreshFlag: number;
  searchKeyword: string;
}) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7; // Số lượng hàng trên mỗi trang
  const [data, setData] = useState<TiepDonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TiepDonItem | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchKeyword) {
        params.append("keyword", searchKeyword);
      }
      params.append("page", page.toString());
      params.append("limit", rowsPerPage.toString());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tiepdon/get-tiep-don?${params.toString()}`
      );
      const result = await res.json();
      console.log("API Response:", result);
      setData(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Lỗi khi tải tiếp đón:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshFlag, searchKeyword, page]);

  const items = data;

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa bệnh nhân này?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tiepdon/delete-tiep-don/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("Lỗi xóa:", error);
        alert(`Lỗi: ${error.message}`);
        return;
      }

      alert("Xóa thành công!");
      loadData();
    } catch (err) {
      console.error("Lỗi khi gọi API xóa:", err);
      alert("Lỗi kết nối đến server.");
    }
  };

  const objectTypes = [
    { key: "Infant", label: "Trẻ sơ sinh" },
    { key: "child", label: "Thiếu nhi" },
    { key: "young", label: "Thanh thiếu niên" },
    { key: "adult", label: "Người trưởng thành" },
    { key: "Senior", label: "Người cao tuổi" },
  ];
  const genders = [
    { key: "boy", label: "Nam" },
    { key: "girl", label: "Nữ" },
    { key: "undetermined", label: "Khác" },
  ];

  const renderCell = (item: TiepDonItem, columnKey: React.Key) => {
    switch (columnKey) {
      case "index":
        return (
          (page - 1) * rowsPerPage +
          data.findIndex((d) => d._id === item._id) +
          1
        );
      case "ngaySinh":
        return new Date(item.ngaySinh).toLocaleDateString();
      case "thoiGianHen":
        return new Date(item.thoiGianHen).toLocaleString();
      case "dichVu":
        return item.dichVu?.tenDichVu ?? "";
      case "giaTien":
        return item.dichVu?.giaTien != null
          ? Number(item.dichVu.giaTien).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            })
          : "";

      case "bacSi":
        return item.bacSi?.hoTen ?? "";
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
                onClick={() => setEditingItem(item)}
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
      default:
        if (columnKey === "doiTuong") {
          const found = objectTypes.find((o) => o.key === item.doiTuong);
          return found ? found.label : (item.doiTuong ?? "");
        }
        if (columnKey === "gioiTinh") {
          const found = genders.find((g) => g.key === item.gioiTinh);
          return found ? found.label : (item.gioiTinh ?? "");
        }
        return (item as any)[String(columnKey)] ?? "";
    }
  };
  return (
    <div className="space-y-4">
      <Table
        aria-label="Danh sách tiếp đón"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={totalPages}
              onChange={(p) => setPage(p)}
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

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[350px] max-w-[90vw] relative border border-gray-200">
            <PatientFormEdit
              data={editingItem}
              onSubmit={() => {
                setEditingItem(null);
                loadData();
              }}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
