import React from "react";
import Table from "@/components/cashier/table";
import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import Link from "next/link";
import { Button } from "@heroui/button";
const Cashier = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <Table />
      <Link href="/">
        <Button radius="full" size="md" color="danger">
          Trở lại
        </Button>
      </Link>
    </div>
  );
};

export default Cashier;
