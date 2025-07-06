"use client";
import React from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import UploadFileButton from "./UploadFileButton";

const columns = [
  { key: "index", label: "STT" },
  { key: "code", label: "Mã BN" },
  { key: "name", label: "Họ và tên" },
  { key: "phone", label: "SĐT" },
  { key: "service", label: "Dịch vụ" },
  { key: "date", label: "Ngày khám" },
  { key: "file", label: "File kết quả" },
  { key: "action", label: "Thao tác" },
];

export default function CompletedMedicalRecordsTable() {
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

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

  const filteredData = React.useMemo(
    () => data.filter((item) => item.trangThai === "Đã Hoàn Thành"),
    [data]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa phiếu khám này?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/delete-phieu-kham/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Lỗi xóa:", data);
        alert(`Lỗi: ${data.message}`);
        return;
      }
      alert("Xóa thành công!");
      fetchData(); // reload dữ liệu
    } catch (err) {
      console.error("Lỗi khi gọi API xóa:", err);
      alert("Lỗi kết nối đến server.");
    }
  };

  const renderCell = (item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "index":
        return (page - 1) * rowsPerPage + filteredData.indexOf(item) + 1;
      case "code":
        return item.tiepDon?.maBenhNhan || "";
      case "name":
        return item.tiepDon?.hoTen || "";
      case "phone":
        return item.tiepDon?.soDienThoai || "";
      case "service":
        return item.tiepDon?.dichVu?.tenDichVu || "";
      case "date":
        return item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "";
      case "file":
        return item.fileKetQua ? (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.fileKetQua}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Xem file
          </a>
        ) : (
          <UploadFileButton phieuId={item._id} />
        );
      case "action":
        return (
          <Button
            color="danger"
            size="sm"
            onPress={() => handleDelete(item._id)}
          >
            Xóa
          </Button>
        );
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4 min-h-screen">
      <Table
        aria-label="Danh sách phiếu khám đã hoàn thành"
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
        <TableBody items={items} emptyContent="Không có phiếu khám hoàn thành">
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
    </div>
  );
}
