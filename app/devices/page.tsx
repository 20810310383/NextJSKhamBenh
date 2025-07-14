"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import TableDevices from "@/components/divices/tableDevices";
import AddModal from "@/components/divices/addModal";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";

// const Devices = () => {
//   const [isClient, setIsClient] = React.useState(false);
//   React.useEffect(() => {
//     setIsClient(true);
//   }, []);
//   if (!isClient) {
//     return (
//       <div className="space-y-4 min-h-screen">
//         <div className="flex justify-end">
//           <AddModal />
//         </div>
//         <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-3 p-10">
//       <div className="flex justify-between items-center">
//         <BreadCrumbs />
//         <AddModal />
//       </div>
//       <TableDevices />
//     </div>
//   );
// };
const Devices = () => {
  const [reload, setReload] = React.useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="flex justify-between items-center">
        <BreadCrumbs />
        <AddModal onCreated={handleReload} />
      </div>
      <TableDevices reload={reload} />
      <div className="-mt-72">
        <Link href="/">
          <Button radius="full" size="md" color="danger">
            Trở lại
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Devices;
