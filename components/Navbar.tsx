"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const pending = (e: React.MouseEvent) => {
  e.preventDefault();
  alert("Chức năng này đang được phát triển");
};

const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };
  const navItems = [
    { icon: Search, label: "Tìm kiếm", href: "#" },
    { icon: Bell, label: "Thông báo", href: "#" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-10">
        <div className="flex justify-between items-center h-16 ">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="hidden sm:block">
              <div className="flex items-center space-x-1">
                <Image
                  src="/next.svg"
                  width={40}
                  height={40}
                  alt="Logo"
                  priority
                  className="rounded-full bg-white border border-gray-200"
                />
              </div>
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link key={index} href={item.href} onClick={pending}>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
                    title={item.label}
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  </button>
                </Link>
              );
            })}
            <Link href={"#"} onClick={pending}>
              <button className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 transition-colors duration-200">
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src="/next.svg"
                  width={32}
                  height={32}
                  alt="My Logo"
                  priority
                />
              </button>
            </Link>
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
                  <Image
                    src="/tiepdon.png"
                    width={40}
                    height={40}
                    alt="Logo"
                    priority
                    className="rounded-full bg-white border border-gray-200"
                  />
                  <span className="ml-2 font-bold text-lg text-gray-700">
                    Hospital
                  </span>
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
                  <Menu className="w-5 h-5 text-gray-600" />
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
              <Link href="#" onClick={pending}>
                <button
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileMenu(false)}
                >
                  <Image
                    className="w-5 h-5 mr-3 rounded-full object-cover"
                    src="/user.png"
                    width={20}
                    height={20}
                    alt="Profile"
                    priority
                  />
                  <span className="text-sm font-medium">Hồ sơ</span>
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
