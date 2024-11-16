import {
  FileCode,
  Files,
  Gauge,
  HandCoins,
  Newspaper,
  PackageSearch,
  Scroll,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Customer / Vendor",
    url: "/dashboard/customer-vendor",
    icon: Users,
  },
  {
    title: "Product / Services",
    url: "/dashboard/product-services",
    icon: PackageSearch,
  },
  {
    title: "Payments",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Sales Invoice",
    url: "/dashboard/sale-invoice",
    icon: Scroll,
  },
  {
    title: "Purchase Invoice",
    url: "#",
    icon: FileCode,
  },
  {
    title: "Expense Income",
    url: "#",
    icon: Files,
  },
  {
    title: "Other Documents",
    url: "#",
    icon: Files,
  },
  {
    title: "Report",
    url: "#",
    icon: Newspaper,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="pt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
