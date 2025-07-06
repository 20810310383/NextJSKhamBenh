"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
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
            label="Email"
            labelPlacement="outside"
            name="email"
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
          <Button className="w-full py-3" color="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
