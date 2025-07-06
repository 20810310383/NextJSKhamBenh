"use client";
import React, { useState } from "react";
import type { SVGProps } from "react";
import {
  Chip,
  Tooltip,
  Pagination,
  Selection,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import TreatmentCalendar from "./xemlich";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

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

const getStatusInfo = (status: string) => {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "chờ thực hiện":
      return { label: "Đang điều trị", color: "warning" as const };
    case "đã hoàn thành":
      return { label: "Đã hoàn thành", color: "success" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

const columns = [
  { key: "index", label: "STT" },
  { key: "name", label: "Họ tên" },
  { key: "phone", label: "SĐT" },
  { key: "address", label: "Địa chỉ" },
  { key: "dob", label: "Ngày sinh" },
  { key: "treatment", label: "Phác đồ điều trị" },
  { key: "doctor", label: "Bác sĩ phụ trách" },
  { key: "startDate", label: "Ngày bắt đầu" },
  { key: "status", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
];

export default function TableExtendedCare() {
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  //   const [totalPages, setTotalPages] = React.useState(1);
  const [selectedTiepDonId, setSelectedTiepDonId] = useState<string | null>(
    null
  );

  const rowsPerPage = 10;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

  // 1. Lấy toàn bộ dữ liệu 1 lần
  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/phieukham/get-phieu-kham`
    );
    const result = await res.json();
    setData(result.data || []);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  // 2. Lọc client-side
  const filteredData = React.useMemo(() => {
    return (data || []).filter((item) => item.chiDinh === "2");
  }, [data]);

  // 3. Tính số trang dựa trên kết quả sau lọc
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // 4. Cắt dữ liệu hiển thị
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa ca Điều trị dài hạn này?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/delete-phieu-kham/${id}`,
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
      fetchData();
    } catch (err) {
      console.error("Lỗi khi gọi API xóa:", err);
      alert("Lỗi kết nối đến server.");
    }
  };

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setSelectedStatus(item.trangThai || "");
    setModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/update-phieu-kham/${selectedItem._id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trangThai: selectedStatus }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        alert(`Lỗi: ${error.message}`);
        return;
      }
      alert("Cập nhật trạng thái thành công!");
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      alert("Lỗi kết nối server.");
    }
  };

  const renderCell = (item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "index":
        return (page - 1) * rowsPerPage + data.indexOf(item) + 1;
      case "name":
        return item.tiepDon?.hoTen || "";
      case "phone":
        return item.tiepDon?.soDienThoai || "";
      case "address":
        return item.tiepDon?.diaChi || "";
      case "dob":
        return item.tiepDon?.ngaySinh
          ? new Date(item.tiepDon.ngaySinh).toLocaleDateString()
          : "";
      case "treatment":
        return item.chanDoanChinh || "";
      case "doctor":
        return item.tiepDon?.bacSi?.hoTen || "";
      case "startDate":
        return item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "";
      case "status":
        const statusInfo = getStatusInfo(item.trangThai || "");
        return (
          <Chip color={statusInfo.color} size="sm" variant="flat">
            {statusInfo.label}
          </Chip>
        );
      case "action":
        return (
          <div className="flex gap-2 justify-center">
            <Tooltip content="Chỉnh sửa">
              <span
                onClick={() => handleEditClick(item)}
                className="cursor-pointer text-default-400"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer text-danger"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Button
              size="sm"
              onClick={() => setSelectedTiepDonId(item.tiepDon._id)}
            >
              Xem lịch
            </Button>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Table
        aria-label="Danh sách điều trị dài hạn"
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
        classNames={{
          wrapper: "min-h-[650px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="Không có phiếu điều trị dài hạn">
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedTiepDonId && (
        <Modal isOpen onClose={() => setSelectedTiepDonId(null)}>
          <ModalContent>
            <ModalHeader>Lịch điều trị</ModalHeader>
            <ModalBody>
              <TreatmentCalendar
                tiepDonId={selectedTiepDonId}
                onClose={() => setSelectedTiepDonId(null)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Cập nhật trạng thái</ModalHeader>
          <ModalBody>
            <Select
              label="Trạng thái"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onSelectionChange={(keys) => {
                setSelectedStatus(Array.from(keys)[0] as string);
              }}
            >
              <SelectItem key="Chờ Thực Hiện">Đang điều trị</SelectItem>
              <SelectItem key="Đã Hoàn Thành">Đã Hoàn Thành</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSaveStatus}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
