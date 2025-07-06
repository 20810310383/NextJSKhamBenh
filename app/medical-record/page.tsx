"use client";
import React from "react";
import MedicalRecordTable from "@/components/medical-record/table";
import DynamicBreadcrumbs from "@/components/BreadCrumbs";

const Page = () => {
  return (
    <div className="flex flex-col p-8 gap-10">
      <DynamicBreadcrumbs />
      <div className="border border-gray-200 rounded-lg w-full min-h-[600px] p-5">
        <MedicalRecordTable />
      </div>
    </div>
  );
};

export default Page;
