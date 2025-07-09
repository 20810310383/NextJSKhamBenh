"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Đăng nhập thất bại");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // 🔐 Lưu token vào localStorage
      alert("Đăng nhập thành công!");
      router.push("/"); // 🔄 Chuyển trang
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-50">
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-2xl px-10 pb-12 pt-8 border border-gray-200 bg-white shadow-lg">
        <p className="pb-6 text-4xl font-semibold text-center">Log In</p>
        <Form
          className="flex flex-col gap-6"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Tài khoản"
            labelPlacement="outside"
            name="username"
            placeholder="Nhập tài khoản"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Nhập mật khẩu"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex justify-end w-full items-center px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Quên mật khẩu?
            </Link>
          </div>
          <Button
            className="w-full py-3"
            color="primary"
            type="submit"
            isLoading={loading}
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
