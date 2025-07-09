"use client";
import React, { useRef } from "react";
import { Input, Textarea } from "@heroui/react";
import ExaminationForm from "@/components/examination/examinationForm";
import DynamicBreadcrumbs from "@/components/BreadCrumbs";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function KhamBenhPage() {
  const searchParams = useSearchParams();
  const dichVu = searchParams.get("dichVu") || "";
  const name = searchParams.get("name") || "";
  const sex = searchParams.get("sex") || "";
  const age = searchParams.get("age") || "";
  const content = searchParams.get("content") || "";
  const _id = searchParams.get("_id") || "";

  const formRef = useRef<any>(null);

  const handleConfirm = async () => {
    const data = formRef.current?.getFormData();
    if (!data) {
      alert("Form chưa sẵn sàng");
      return;
    }
    if (!data.chiDinh) {
      alert("Vui lòng chọn chỉ định");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/create-phieu-kham`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tiepDon: _id,
            ...data,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        alert(`Lỗi: ${err.message}`);
        return;
      }
      alert("Tạo phiếu khám thành công!");
      // 1: Thủ thuật - phẫu thuật, 2: Điều trị dài hạn, 3: Không có chỉ định
      if (data.chiDinh === "1") {
        window.location.href = "/medical-procedure";
      } else if (data.chiDinh === "2") {
        window.location.href = "/extended-care";
      } else {
        window.location.href = "/cashier";
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi khi gọi API");
    }
  };
  return (
    <div className="flex flex-col gap-3 p-10">
      <DynamicBreadcrumbs />
      <ExaminationForm
        ref={formRef}
        dichVu={dichVu}
        name={name}
        sex={sex}
        age={age}
        content={content}
        _id={_id}
        // onSubmit={() => {
        //   window.location.href = "/";
        // }}
      />
      <div className="flex justify-between">
        <Link href="/">
          <Button className="w-1/5" radius="full" size="md" color="danger">
            Hủy
          </Button>
        </Link>
        {/* <Link href="/">
        </Link> */}
        <Button
          onClick={handleConfirm}
          className="w-1/5"
          radius="full"
          size="md"
          color="primary"
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}
