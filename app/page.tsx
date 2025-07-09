"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Nếu không có token, chuyển về trang login
      router.push("/login");
    }
    // Nếu có token thì không làm gì => ở lại trang này
  }, [router]);

  return (
    <div className="flex-1 justify-center text-center items-center p-10 ">
      <div className="border border-gray-200 rounded-lg p-5">
        <Card />
      </div>
    </div>
  );
};

export default Page;
