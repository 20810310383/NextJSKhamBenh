import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import TableMedicalProcedure from "@/components/medical-procedure/table";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function MedicalProcedurePage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <TableMedicalProcedure />
      <div>
        <Link href="/">
          <Button radius="full" size="md" color="danger">
            Trở lại
          </Button>
        </Link>
      </div>
    </div>
  );
}
