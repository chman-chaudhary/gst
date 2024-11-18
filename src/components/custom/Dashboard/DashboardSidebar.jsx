import {
  ArrowBigRight,
  ArrowBigLeft,
  ChevronRight,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const navlinks = [
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
    items: [
      {
        title: "Inward Payments",
        url: "/dashboard/inward-payment",
        icon: ArrowBigRight,
      },
      {
        title: "Outward Payments",
        url: "/dashboard/outward-payments",
        icon: ArrowBigLeft,
      },
    ],
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
              {navlinks.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    title={item.title}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarGroup className="p-0">
                      <SidebarGroupLabel
                        asChild
                        className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <CollapsibleTrigger>
                          <item.icon className="mr-2" />
                          <span className="text-base">{item.title}</span>{" "}
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <CollapsibleContent>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {item.items.map((item) => (
                              <SidebarMenuItem
                                key={item.title}
                                className="pl-5"
                              >
                                <SidebarMenuButton
                                  asChild
                                  isActive={item.isActive}
                                >
                                  <Link href={item.url}>
                                    <item.icon />
                                    <span className="text-base">
                                      {item.title}
                                    </span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </CollapsibleContent>
                    </SidebarGroup>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
