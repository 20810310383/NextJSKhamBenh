"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  NumberInput,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import SubmitCategory from "./submitCategory";
import SubmitUnit from "./submitUnit";

export default function AddModal({ onCreated }: { onCreated?: () => void }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tenVatDung, setTenVatDung] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [nhaCungCap, setNhaCungCap] = useState("");
  const [loai, setLoai] = useState("");
  const [donVi, setDonVi] = useState("");

  const handleSubmit = async () => {
    const payload = {
      tenVatDung,
      tonKho: soLuong,
      loai,
      donVi,
      nhaCungCap,
    };

    console.log("Payload gửi lên server:", JSON.stringify(payload));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dungcusudung/create-dungcusudung`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload ? JSON.stringify(payload) : "{}",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        console.error("Lỗi từ server:", result);
        throw new Error(result.message || "Tạo vật dụng thất bại");
      }

      if (onCreated) onCreated();
      onOpenChange(); // Đóng modal
    } catch (error) {
      console.error(error);
      alert("Không thể thêm vật dụng");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Thêm vật dụng
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                Thêm vật dụng
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <span className="text-sm font-medium">Tên vật dụng</span>
                    <Input
                      value={tenVatDung}
                      onValueChange={setTenVatDung}
                      placeholder="Nhập tên vật dụng"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <span className="text-sm font-medium">Loại</span>
                    <SubmitCategory onChange={setLoai} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <span className="text-sm font-medium">Số lượng</span>
                    <NumberInput
                      value={soLuong}
                      onValueChange={setSoLuong}
                      min={1}
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <span className="text-sm font-medium">Đơn vị</span>
                    <SubmitUnit onChange={setDonVi} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <span className="text-sm font-medium">Nhà cung cấp</span>
                    <Input
                      value={nhaCungCap}
                      onValueChange={setNhaCungCap}
                      placeholder="Nhập nhà cung cấp"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="flat" color="danger" onPress={onClose}>
                  Thoát
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
