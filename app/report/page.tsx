import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import React from "react";
import Cards from "@/components/report/cards";

const Report = () => {
  return (
    <div className="flex flex-col gap-5 p-10 ">
      <DynamicBreadcrumbs />
      <div className=" min-h-[650px]  border border-gray-200 rounded p-10 ">
        <Cards />
      </div>
    </div>
  );
};

export default Report;
