"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import TableDevices from "@/components/divices/tableDevices";
import AddModal from "@/components/divices/addModal";
import React from "react";

const Devices = () => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <div className="space-y-4 min-h-screen">
        <div className="flex justify-end">
          <AddModal />
        </div>
        <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="flex justify-between items-center">
        <BreadCrumbs />
        <AddModal />
      </div>
      <TableDevices />
    </div>
  );
};

export default Devices;
