import React from "react";
import Table from "@/components/cashier/table";
import DynamicBreadcrumbs from "@/components/BreadCrumbs";

const Cashier = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <Table />
    </div>
  );
};

export default Cashier;
