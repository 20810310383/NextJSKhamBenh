import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import Form from "@/components/medical-procedure/form";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <Form />
    </div>
  );
};

export default page;
