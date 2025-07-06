import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import TableExamination from "@/components/examination/tableExamination";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function ExaminationPage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <DynamicBreadcrumbs />
      <TableExamination />
      <div>
        <Link href="/">
          <Button className="w-1/5" radius="full" size="md" color="danger">
            Trở lại
          </Button>
        </Link>
      </div>
    </div>
  );
}
