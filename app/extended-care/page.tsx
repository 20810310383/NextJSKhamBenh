import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import TableExtendedCare from "@/components/extended-care/table";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function ExaminationPage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <TableExtendedCare />
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
