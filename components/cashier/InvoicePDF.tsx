"use client";
import React from "react";
import { Button } from "@heroui/react";

type Props = {
  phieu: any;
  onClose: () => void;
};

export default function InvoicePDF({ phieu, onClose }: Props) {
  return (
    <div className="p-6 space-y-4 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center">HÓA ĐƠN THANH TOÁN</h2>
      <p>
        <strong>Bệnh nhân:</strong> {phieu.tiepDon?.hoTen}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {phieu.tiepDon?.soDienThoai}
      </p>
      <p>
        <strong>Dịch vụ:</strong> {phieu.tiepDon?.dichVu?.tenDichVu}
      </p>
      <p>
        <strong>Chẩn đoán:</strong> {phieu.chanDoanChinh}
      </p>
      <p>
        <strong>Số tiền:</strong> {phieu.thanhToan?.soTien?.toLocaleString()}{" "}
        VNĐ
      </p>
      <div className="flex justify-center">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            phieu.thanhToan?.qrUrl
          )}`}
          alt="QR code"
        />
      </div>
      <p className="text-center text-green-600 font-medium">
        Quét QR để thanh toán
      </p>
      <div className="flex justify-center">
        <Button onClick={onClose}>Đóng</Button>
      </div>
    </div>
  );
}
