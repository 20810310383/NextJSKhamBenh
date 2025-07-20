"use client";
import React, { SVGProps } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@heroui/react";
import UploadFileButton from "./UploadFileButton";

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
const columns = [
  { key: "index", label: "STT" },
  { key: "code", label: "Mã BN" },
  { key: "name", label: "Họ và tên" },
  { key: "cccd", label: "CCCD" },
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
      case "cccd":
        return item.tiepDon?.canCuocCongDan || "";
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
          <>
            <a
              href={`${process.env.NEXT_PUBLIC_FILE_URL}/uploads/${item.fileKetQua}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Xem file
            </a>
            <UploadFileButton title="Upload lại" phieuId={item._id} />
          </>
        ) : (
          <UploadFileButton title="Thêm file" phieuId={item._id} />
        );
      case "action":
        return (
          <Tooltip color="danger" content="Xóa">
            <span
              className="text-lg text-center text-danger cursor-pointer active:opacity-50"
              onClick={() => handleDelete(item._id)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
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
