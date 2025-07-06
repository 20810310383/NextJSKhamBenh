import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@heroui/react";

export default function SubmitCategory() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Chọn loại"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="Tiêu hao">Tiêu hao</DropdownItem>
        <DropdownItem key="Hóa chất">Hóa chất</DropdownItem>
        <DropdownItem key="Thiết bị">Thiết bị</DropdownItem>
        <DropdownItem key="Trang phục">Trang phục</DropdownItem>
        <DropdownItem key="Phụ kiện">Phụ kiện</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
