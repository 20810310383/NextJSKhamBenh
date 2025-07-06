"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  NumberInput,
} from "@heroui/react";
import SubmitCategory from "./submitCategory";
import SubmitUnit from "./submitUnit";

export default function AddModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Thêm vật dụng
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-center items-center gap-1">
                Thêm vật dụng
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-4 py-4 justify-between items-center text-center">
                  <div className="flex flex-row gap-4 ">
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-sm font-medium">Tên vật dụng</span>
                      <Input placeholder="Nhập tên vật dụng" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-sm font-medium">Loại</span>
                      <SubmitCategory />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-sm font-medium">Số lượng</span>
                      <NumberInput placeholder="Nhập số lượng" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 justify-center">
                      <span className="text-sm font-medium">Đơn vị</span>
                      <SubmitUnit />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Nhà cung cấp</span>
                    <Input placeholder="Nhập nhà cung cấp" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Thoát
                </Button>
                <Button color="primary" onPress={onClose}>
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
