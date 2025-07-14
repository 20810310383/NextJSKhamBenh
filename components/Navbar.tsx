"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import {
  Bell,
  Search,
  Settings,
  Menu,
  HelpCircle,
  X,
  UserPlus,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

type UserIconProps = {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
};
export const UserIcon = ({
  fill = "#000",
  size,
  height,
  width,
  ...props
}: UserIconProps) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          data-name="Stroke 1"
        />
        <path
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
          data-name="Stroke 3"
        />
      </g>
    </svg>
  );
};

const pending = (e: React.MouseEvent) => {
  e.preventDefault();
  alert("Chức năng này đang được phát triển");
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };
  const navItems = [
    { icon: Search, label: "Tìm kiếm", href: "#" },
    { icon: Bell, label: "Thông báo", href: "#" },
  ];

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true nếu có token
  }, []);
  if (pathname === "/login") return null;

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // nếu bạn dùng cookie
      });

      // Xoá token khỏi localStorage
      localStorage.removeItem("token");
      setIsLoggedIn(false);

      // Chuyển hướng về trang login
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Đăng xuất thất bại");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-10">
        <div className="flex justify-between items-center h-16 ">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="hidden sm:block">
              <div className="flex items-center space-x-1">
                <img src="/logo.png" width={60} height={60} alt="Logo" />
                <div className="flex gap-2">
                  <h1 className="text-xl font-bold text-[#0194d0]">Smile</h1>
                  <h1 className="text-xl font-bold text-[#01d09e]">House</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link key={index} href={item.href}>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
                    title={item.label}
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  </button>
                </Link>
              );
            })}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  className="cursor-pointer flex items-center gap-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                >
                  <UserIcon />
                  Admin
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="min-w-0 w-full">
                <DropdownItem key="1" className="p-0">
                  <Button
                    size="sm"
                    color="default"
                    onClick={handleLogout}
                    className="w-full bg-white hover:bg-gray-300 rounded-full"
                  >
                    Đăng xuất
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex items-center w-full justify-between sm:hidden">
            <div>
              <Link href="#" onClick={pending}>
                <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="flex items-center justify-center text-center"
              >
                <div className="flex items-center space-x-1">
                  <div className="flex items-center flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <img src="/logo.png" width={60} height={60} alt="Logo" />
                      <div className="flex flex-col h-15">
                        <h1 className="text-xl font-bold text-[#0194d0]">
                          Smile
                        </h1>
                        <h1 className="text-xl font-bold text-[#01d09e]">
                          House
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex">
              <Link href="#" onClick={pending}>
                <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                {isMobileMenu ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <UserIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMobileMenu
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-10">
          <div className="py-4 space-y-1">
            {navItems
              .filter((item) => !["Tìm kiếm", "Thông báo"].includes(item.label))
              .map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link key={index} href={item.href} onClick={pending}>
                    <button
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      onClick={() => setIsMobileMenu(false)}
                    >
                      <IconComponent className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            <div className="pt-2 border-t border-gray-100">
              <Link href="#">
                <button
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
