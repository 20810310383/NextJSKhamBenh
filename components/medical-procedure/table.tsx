"use client";
import React from "react";
import type { SVGProps } from "react";
import type { ChipProps } from "@heroui/react";
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
import Link from "next/link";
import Detail from "./detail";

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

const getStatusInfo = (status: string) => {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "chờ thực hiện":
      return { label: "Chờ thực hiện", color: "warning" as const };
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
  { key: "procedure", label: "Lý do khám" },
  { key: "doctor", label: "Bác sĩ thực hiện" },
  { key: "date", label: "Ngày thực hiện" },
  { key: "status", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
  //   { key: "start", label: "Thực hiện" },
];

export default function TableMedicalProcedure() {
  const [data, setData] = React.useState<any[]>([]);
  //   const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [viewItem, setViewItem] = React.useState<any>(null);

  // ----------------------------------------------------
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
    return (data || []).filter((item) => item.chiDinh === "1");
  }, [data]);

  // 3. Tính số trang dựa trên kết quả sau lọc
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // 4. Cắt dữ liệu hiển thị
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa ca Phẫu thuật - thủ thuật này?"))
      return;

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
      case "procedure":
        return item.tiepDon?.dichVu?.tenDichVu || "";
      case "doctor":
        return item.tiepDon?.bacSi?.hoTen || "";
      case "date":
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
        const isChoThucHien =
          item.trangThai?.trim().toLowerCase() === "chờ thực hiện";

        return (
          <div className="flex gap-2 justify-center">
            {isChoThucHien ? (
              // Nếu đang "Chờ thực hiện" → chỉ hiển thị nút "Bắt đầu thực hiện"
              <Link
                href={{
                  pathname: "/medical-procedure/start",
                  query: { id: item._id },
                }}
              >
                <Button color="primary" size="sm">
                  Bắt đầu thực hiện
                </Button>
              </Link>
            ) : (
              // Nếu đã hoàn thành → chỉ hiển thị nút "Xem"
              <Tooltip content="Xem chi tiết">
                <Button
                  color="primary"
                  size="sm"
                  variant="flat"
                  onClick={() => {
                    setViewItem(item);
                    setViewModalOpen(true);
                  }}
                >
                  Xem
                </Button>
              </Tooltip>
            )}

            {/* Nút Xoá luôn hiển thị */}
            <Tooltip color="danger" content="Xóa">
              <span
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer text-danger"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );

      //   case "start":
      //     return (
      //       <Link
      //         href={{
      //           pathname: "/medical-procedure/start",
      //           query: { id: item._id }, // Truyền ID phiếu khám
      //         }}
      //       >
      //         <Button color="primary" size="sm">
      //           Bắt đầu thực hiện
      //         </Button>
      //       </Link>
      //     );
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Table
        aria-label="Danh sách thủ thuật/phẫu thuật"
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
        <TableBody
          items={items}
          emptyContent="Không có phiếu khám thủ thuật/phẫu thuật"
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
              <SelectItem key="Chờ Thực Hiện">Chờ Thực Hiện</SelectItem>
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
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Chi tiết thủ thuật/phẫu thuật</ModalHeader>
          <ModalBody>{viewItem ? <Detail data={viewItem} /> : null}</ModalBody>
          <ModalFooter>
            <Button onClick={() => setViewModalOpen(false)}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
