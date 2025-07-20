"use client";
import React from "react";
import MedicalRecordTable from "@/components/medical-record/table";
import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import Link from "next/link";
import { Button } from "@heroui/button";
const Page = () => {
  return (
    <div className="flex flex-col p-8 gap-10">
      <DynamicBreadcrumbs />
      <div className=" w-full min-h-[600px] p-5">
        <MedicalRecordTable />
      </div>
      <div className="-mt-80 p-5">
        <Link href="/">
          <Button radius="full" size="md" color="danger">
            Trở lại
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
