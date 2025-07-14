"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import BreadCrumbs from "@/components/BreadCrumbs";
import PatientForm from "@/components/reception/patientForm";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

const TableReception = dynamic(
  () => import("@/components/reception/tableReception"),
  { ssr: false }
);

const ReceptionPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleFormSubmit = () => {
    alert("Tiếp đón thành công!");
    setOpen(false);
    setRefreshFlag((f) => f + 1);
  };

  return (
    <div
      className="flex flex-col gap-3 p-10 min-h-screen"
      style={{ background: "var(--color-bg)" }}
    >
      <BreadCrumbs className="text-[var(--color-paragraph)]" />
      <div className="flex justify-between items-center mb-4 gap-4">
        <Input
          type="text"
          size="sm"
          label="Tìm kiếm"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="rounded px-3 py-2 w-1/3"
        />
        <Button
          className="w-1/5"
          radius="full"
          size="md"
          style={{
            background: "var(--color-button)",
            color: "var(--color-button-text)",
          }}
          onClick={() => setOpen(true)}
        >
          Thêm bệnh nhân
        </Button>
      </div>
      <TableReception refreshFlag={refreshFlag} searchKeyword={searchKeyword} />
      <div className="flex justify-start mt-4 gap-4"></div>
      {/* Modal popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[350px] max-w-[90vw] relative border border-gray-200">
            <PatientForm
              onSubmit={handleFormSubmit}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      )}
      <div className="-mt-8">
        <Link href="/">
          <Button radius="full" size="md" color="danger">
            Trở lại
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReceptionPage;
