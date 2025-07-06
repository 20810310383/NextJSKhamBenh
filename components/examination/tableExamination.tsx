"use client";
import React, { useEffect, useState } from "react";
import type { SVGProps } from "react";
import type { ChipProps } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";
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
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    phone: "0901234567",
    gioiTinh: "Nam",
    idCard: "123456789",
    address: "Hà Nội",
    dob: "01/01/1990",
    objectType: "Người trưởng thành",
    selectedService: "Kiểm tra tổng quát",
    appointmentTime: "10:00 01/06/2024",
    content: "Khám tổng quát",
    doctor: "Bác sĩ 1",
    status: "Chờ khám",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "d@gmail.com",
    phone: "0934567891",
    gioiTinh: "Nữ",
    idCard: "654321987",
    address: "Cần Thơ",
    dob: "04/04/1995",
    objectType: "Người trưởng thành",
    selectedService: "Nha Chu",
    appointmentTime: "11:00 04/06/2024",
    content: "Điều trị nha chu",
    doctor: "Bác sĩ 4",
    status: "Chờ khám",
  },
  {
    id: "7",
    name: "Đặng Văn G",
    email: "g@gmail.com",
    phone: "0967891234",
    gioiTinh: "Nam",
    idCard: "987321654",
    address: "Quảng Ninh",
    dob: "07/07/1991",
    objectType: "Người trưởng thành",
    selectedService: "Cấy ghép Implant",
    appointmentTime: "13:00 07/06/2024",
    content: "Cấy ghép răng số 7",
    doctor: "Bác sĩ 2",
    status: "Chờ khám",
  },
  {
    id: "10",
    name: "Lý Thị K",
    email: "k@gmail.com",
    phone: "0991234567",
    gioiTinh: "Nữ",
    idCard: "456123789",
    address: "Bình Dương",
    dob: "10/10/1994",
    objectType: "Người trưởng thành",
    selectedService: "Tiểu phẫu - Răng khôn",
    appointmentTime: "17:00 10/06/2024",
    content: "Nhổ răng khôn hàm dưới",
    doctor: "Bác sĩ 5",
    status: "Chờ khám",
  },
  {
    id: "13",
    name: "Bùi Văn N",
    email: "n@gmail.com",
    phone: "0924567891",
    gioiTinh: "Nam",
    idCard: "654321789",
    address: "Nam Định",
    dob: "13/01/1990",
    objectType: "Người trưởng thành",
    selectedService: "Chỉnh nha",
    appointmentTime: "11:00 13/06/2024",
    content: "Niềng răng chỉnh khớp cắn",
    doctor: "Bác sĩ 3",
    status: "Chờ khám",
  },
];

const columns = [
  { key: "index", label: "STT" },
  { key: "hoTen", label: "Họ tên" },
  { key: "email", label: "Email" },
  { key: "soDienThoai", label: "SĐT" },
  { key: "gioiTinh", label: "Giới tính" },
  { key: "canCuocCongDan", label: "CCCD" },
  { key: "diaChi", label: "Địa chỉ" },
  { key: "ngaySinh", label: "Ngày sinh" },
  { key: "doiTuong", label: "Đối tượng" },
  { key: "dichVu", label: "Dịch vụ" },
  { key: "thoiGianHen", label: "Thời gian hẹn" },
  { key: "noiDung", label: "Nội dung" },
  { key: "bacSi", label: "Bác sĩ" },
  { key: "trangThai", label: "Trạng thái" },
  { key: "action", label: "Thao tác" },
];
// const columns = [
//   { key: "id", label: "STT" },
//   { key: "name", label: "Họ tên" },
//   { key: "email", label: "Email" },
//   { key: "phone", label: "SĐT" },
//   { key: "gioiTinh", label: "Giới tính" },
//   { key: "idCard", label: "CCCD" },
//   { key: "address", label: "Địa chỉ" },
//   { key: "dob", label: "Ngày sinh" },
//   { key: "objectType", label: "Đối tượng" },
//   { key: "selectedService", label: "Dịch vụ" },
//   { key: "appointmentTime", label: "Thời gian hẹn" },
//   { key: "content", label: "Nội dung" },
//   { key: "doctor", label: "Bác sĩ" },
//   { key: "status", label: "Trạng thái" },
//   { key: "action", label: "Thao tác" },
// ];

type ExaminationItem = (typeof rows)[0];

function getAge(dob: string) {
  if (!dob) return "";
  const [day, month, year] = dob.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
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
  dichVu?: { _id: string; tenDichVu: string };
  thoiGianHen: string;
  noiDung: string;
  bacSi?: { _id: string; hoTen: string };
  trangThai: string;
};
export default function TableExamination() {
  const [data, setData] = useState<TiepDonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6; // Số lượng hàng trên mỗi trang

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tiepdon/get-tiep-don`
      );
      const result = await res.json();
      console.log("API Response:", result);

      const allData = (result.data || []).filter(
        (d: TiepDonItem) => d.trangThai === "Chờ Khám"
      );

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      setData(allData.slice(start, end));
      setTotalPages(Math.ceil(allData.length / rowsPerPage));
    } catch (err) {
      console.error("Lỗi khi tải tiếp đón:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const items = data;
  console.log("Data loaded:", items);

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
      case "bacSi":
        return item.bacSi?.hoTen ?? "";
      case "trangThai":
        return (
          <Chip
            className="capitalize"
            color={"warning"}
            size="sm"
            variant="flat"
          >
            Chờ khám
          </Chip>
        );
      case "action":
        return (
          <Link
            href={`/examination/kham-benh?name=${encodeURIComponent(
              item.hoTen || ""
            )}&sex=${encodeURIComponent(
              item.gioiTinh || ""
            )}&age=${encodeURIComponent(
              item.ngaySinh
                ? getAge(new Date(item.ngaySinh).toLocaleDateString("en-GB"))
                : ""
            )}&content=${encodeURIComponent(item.noiDung || "")}&dichVu=${encodeURIComponent(item.dichVu?.tenDichVu || "")}&_id=${encodeURIComponent(item._id)}`}
          >
            <Button color="primary" size="sm">
              Bắt đầu khám
            </Button>
          </Link>
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
        aria-label="Danh sách bệnh nhân chờ khám"
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
        classNames={{ wrapper: "min-h-[600px]" }}
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
    </div>
  );
}
