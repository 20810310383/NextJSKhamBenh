"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbConfig {
  label: string;
  showInBreadcrumb?: boolean;
  customPath?: string;
}

const pathMapping: Record<string, BreadcrumbConfig> = {
  "": { label: "Trang chủ" },
  home: { label: "Trang chủ" },
  receive: { label: "Tiếp đón bệnh nhân" },
  devices: { label: "Quản lý vật dụng - thiết bị" },
  "danh-sach": { label: "Danh sách tiếp đón bệnh nhân" },
  "tiep-don": { label: "Tiếp đón bệnh nhân" },
  examination: { label: "Danh sách bệnh nhân chờ khám" },
  "kham-benh": { label: "Khám bệnh" },
  reception: { label: "Danh sách tiếp đón bệnh nhân " },
  "medical-record": { label: "Hồ sơ bệnh án" },
  "extended-care": { label: "Điều trị dài hạn" },
  "medical-procedure": { label: "Phẫu thuật - thủ thuật" },
};

const hiddenPaths = new Set(["api", "auth", "_next"]);

const getDisplayName = (segment: string): string => {
  const config = pathMapping[segment];
  if (config) {
    return config.label;
  }

  if (/^\d+$/.test(segment)) {
    return `ID: ${segment}`;
  }

  if (segment.length > 10 && /^[a-f0-9-]+$/i.test(segment)) {
    return `ID: ${segment.substring(0, 8)}...`;
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface DynamicBreadcrumbsProps {
  homeLabel?: string;
  maxItems?: number;
  showHome?: boolean;
  className?: string;
}

// Alternative approach: Make props optional with default parameter
export default function DynamicBreadcrumbs(
  props: DynamicBreadcrumbsProps = {}
) {
  const {
    homeLabel = "Trang chủ",
    maxItems = 5,
    showHome = true,
    className = "",
  } = props;

  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter((segment) => segment !== "" && !hiddenPaths.has(segment));

    type BreadcrumbItem = {
      href: string;
      label: string;
      isLast: boolean;
      isEllipsis?: boolean;
    };

    const items: BreadcrumbItem[] = [];

    if (showHome) {
      items.push({
        href: "/",
        label: homeLabel,
        isLast: segments.length === 0,
      });
    }

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      items.push({
        href,
        label: getDisplayName(segment),
        isLast,
      });
    });

    if (items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-maxItems + 2);
      return [
        firstItem,
        { href: "#", label: "...", isLast: false, isEllipsis: true },
        ...lastItems,
      ];
    }

    return items;
  }, [pathname, homeLabel, maxItems, showHome]);

  if (breadcrumbItems.length <= 1 && showHome) {
    return null;
  }

  return (
    <div className={`flex flex-col flex-wrap gap-4 ${className}`}>
      <Breadcrumbs>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={`${item.href}-${index}`}>
            {item.isLast || item.isEllipsis ? (
              item.label
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
