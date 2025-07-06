import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@heroui/react";

export default function SubmitUnit() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Chọn đơn vị"])
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
        <DropdownItem key="Hộp">Hộp</DropdownItem>
        <DropdownItem key="Gói">Gói</DropdownItem>
        <DropdownItem key="Chai">Chai</DropdownItem>
        <DropdownItem key="Cái">Cái</DropdownItem>
        <DropdownItem key="Chiếc">Chiếc</DropdownItem>
        <DropdownItem key="Bộ">Bộ</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
