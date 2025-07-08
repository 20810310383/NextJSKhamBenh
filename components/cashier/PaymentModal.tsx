"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  Input,
} from "@heroui/react";

type Props = {
  phieu: any;
  onClose: () => void;
  onUpdated: () => void;
};

export default function PaymentModal({ phieu, onClose, onUpdated }: Props) {
  const [soTien, setSoTien] = useState(phieu.thanhToan?.soTien || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!soTien || parseInt(soTien) <= 0) {
      alert("Nhập số tiền hợp lệ");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/phieukham/set-price/${phieu._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soTien: parseInt(soTien) }),
      }
    );
    setLoading(false);
    if (res.ok) {
      alert("Đã lưu giá & tạo QR");
      onUpdated();
      onClose();
    } else {
      const err = await res.json();
      alert(`Lỗi: ${err.message}`);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>Thiết lập giá thanh toán</ModalHeader>
        <ModalBody>
          <Input
            label="Số tiền (VNĐ)"
            value={soTien}
            onChange={(e) => setSoTien(e.target.value)}
            type="number"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Hủy
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={loading}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
