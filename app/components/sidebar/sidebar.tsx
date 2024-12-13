"use client";
import Link from "next/link";
import "../../sass/components/sidebar.scss";
import { Menu } from "./menu";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const data = Menu;
  const pathname = usePathname();
  return (
    <div className="sidebar">
      <div className="sidebar_logo">Interactive Avenue</div>
      <div className="sidebar_links">
        {data.map((tab) => {
          return (
            <Link
              key={tab.navName}
              href={tab.url}
              className={
                pathname === tab.url
                  ? "sidebar_links-navLink sidebar_links-navLink-active"
                  : "sidebar_links-navLink"
              }
              aria-label={tab.navName}
            >
              {tab.icon} {tab.navName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
