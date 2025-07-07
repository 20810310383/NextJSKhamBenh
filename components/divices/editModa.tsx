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
} from "@heroui/react";
import { useEffect, useState } from "react";
import SubmitCategory from "./submitCategory";
import SubmitUnit from "./submitUnit";

export default function EditModal({
  item,
  onClose,
  onUpdated,
}: {
  item: any;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [tenVatDung, setTenVatDung] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [nhaCungCap, setNhaCungCap] = useState("");
  const [loai, setLoai] = useState("");
  const [donVi, setDonVi] = useState("");

  useEffect(() => {
    if (item) {
      setTenVatDung(item.tenVatDung || "");
      setSoLuong(item.tonKho || 1);
      setNhaCungCap(item.nhaCungCap || "");
      setLoai(item.loai || "");
      setDonVi(item.donVi || "");
    }
  }, [item]);

  const handleSubmit = async () => {
    const payload = {
      tenVatDung,
      tonKho: soLuong,
      loai,
      donVi,
      nhaCungCap,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dungcusudung/update-dungcusudung/${item._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Cập nhật thất bại");

      onUpdated(); // gọi lại hàm reload
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật vật dụng");
    }
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center" size="5xl">
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex justify-center">
              Chỉnh sửa vật dụng
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                  <span className="text-sm font-medium">Tên vật dụng</span>
                  <Input value={tenVatDung} onValueChange={setTenVatDung} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                  <span className="text-sm font-medium">Loại</span>
                  <SubmitCategory defaultValue={loai} onChange={setLoai} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                  <span className="text-sm font-medium">Số lượng</span>
                  <NumberInput value={soLuong} onValueChange={setSoLuong} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                  <span className="text-sm font-medium">Đơn vị</span>
                  <SubmitUnit defaultValue={donVi} onChange={setDonVi} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                  <span className="text-sm font-medium">Nhà cung cấp</span>
                  <Input value={nhaCungCap} onValueChange={setNhaCungCap} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button variant="flat" color="danger" onPress={onModalClose}>
                Hủy
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Lưu thay đổi
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
