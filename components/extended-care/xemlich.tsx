"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@heroui/react";

type Props = {
  tiepDonId: string;
  onClose: () => void;
};

export default function TreatmentCalendar({ tiepDonId, onClose }: Props) {
  const [phieuList, setPhieuList] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/by-tiepdon/${tiepDonId}`
      );
      const data = await res.json();
      setPhieuList(data.data || []);
    };
    fetchData();
  }, [tiepDonId]);

  const markedDates = phieuList.map((p) =>
    new Date(p.createdAt).toDateString()
  );

  const handleDateClick = (date: Date) => {
    const match = phieuList.find(
      (p) => new Date(p.createdAt).toDateString() === date.toDateString()
    );
    if (match) {
      setSelectedDetail(match);
      setSelectedDate(date);
    } else {
      setSelectedDetail(null);
      setSelectedDate(null);
    }
  };

  return (
    <div className="space-y-4">
      <Calendar
        onClickDay={handleDateClick}
        tileContent={({ date, view }) => {
          if (view === "month" && markedDates.includes(date.toDateString())) {
            return (
              <div
                style={{
                  background: "green",
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  textAlign: "center",
                  fontSize: "0.75rem",
                  lineHeight: "20px",
                  margin: "auto",
                }}
              >
                ✔
              </div>
            );
          }
          return null;
        }}
      />

      {selectedDetail && (
        <Modal isOpen onClose={() => setSelectedDetail(null)}>
          <ModalContent>
            <ModalHeader>
              <span className="text-lg font-semibold">
                Chi tiết khám ngày {selectedDate?.toLocaleDateString()}
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border rounded-lg">
                  <tbody>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">
                        Chẩn đoán chính
                      </td>
                      <td className="p-2">
                        {selectedDetail.chanDoanChinh || "-"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">
                        Chẩn đoán sơ bộ
                      </td>
                      <td className="p-2">
                        {selectedDetail.chanDoanSoBo || "-"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">
                        Mô tả chi tiết
                      </td>
                      <td className="p-2">
                        {selectedDetail.moTaChiTiet || "-"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Kết luận</td>
                      <td className="p-2">{selectedDetail.ketLuan || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Nhiệt độ</td>
                      <td className="p-2">{selectedDetail.nhietDo || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Huyết áp</td>
                      <td className="p-2">{selectedDetail.huyetAp || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Nhịp thở</td>
                      <td className="p-2">{selectedDetail.nhipTho || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Mạch</td>
                      <td className="p-2">{selectedDetail.mach || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Cân nặng</td>
                      <td className="p-2">{selectedDetail.canNang || "-"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-medium p-2 bg-gray-50">Chiều cao</td>
                      <td className="p-2">{selectedDetail.chieuCao || "-"}</td>
                    </tr>
                    <tr>
                      <td className="font-medium p-2 bg-gray-50">Chỉ định</td>
                      <td className="p-2">
                        {selectedDetail.chiDinh === "1"
                          ? "Thủ thuật - phẫu thuật"
                          : selectedDetail.chiDinh === "2"
                            ? "Điều trị dài hạn"
                            : selectedDetail.chiDinh === "3"
                              ? "Không có chỉ định"
                              : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <div className="flex justify-end">
        <Button onClick={onClose}>Đóng</Button>
      </div>
    </div>
  );
}
