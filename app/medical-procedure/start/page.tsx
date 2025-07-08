"use client";

import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import Form from "@/components/medical-procedure/form";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <Form id={id ?? undefined} />
    </div>
  );
};

export default page;
