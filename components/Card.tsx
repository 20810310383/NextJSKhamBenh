"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import NextLink from "next/link";

export default function App() {
  const list = [
    {
      title: "Tiếp đón ",
      img: "/tiepdon.png",
      href: "/reception",
    },
    {
      title: "Khám bệnh",
      img: "/khambenh.jpg",
      href: "/examination ",
    },
    {
      title: "Điều trị dài hạn",
      img: "/dieutridaihan.jpg",
      href: "/extended-care",
    },
    {
      title: "Hồ sơ bệnh án",
      img: "/hosobenhan.jpg",
      href: "/medical-record",
    },
    {
      title: "Phẫu thuật - Thủ thuật",
      img: "/phauthuat.jpg",
      href: "/medical-procedure",
    },
    {
      title: "Thu ngân",
      img: "/thungan.jpg",
      href: "/cashier",
    },
    {
      title: "Báo cáo",
      img: "/baocao.jpg",
      href: "/report",
    },
    {
      title: "Quản lý vật dụng - thiết bị",
      img: "/quanlyvatdung.jpg",
      href: "/devices",
    },
    {
      title: "Quản trị hệ thống",
      img: "/quantri.jpg",
      href: "/quan-tri-he-thong",
    },
  ];

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card key={index} isPressable shadow="sm" as={Link} href={item.href}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-contain h-[150px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex text-small items-center justify-center">
            <b>{item.title}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
