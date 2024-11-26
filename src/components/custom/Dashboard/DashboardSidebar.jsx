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
  CreditCard,
  PackageCheck,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Menu items.
const navlinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Leagers",
    url: "/dashboard/leagers",
    icon: Users,
  },
  {
    title: "Product / Services",
    url: "/dashboard/product-services",
    icon: PackageSearch,
  },
  {
    title: "Payments",
    icon: HandCoins,
    items: [
      {
        title: "Inward Payments",
        url: "/dashboard/inward-payment",
        icon: ArrowBigRight,
      },
      {
        title: "Outward Payments",
        url: "/dashboard/outward-payment",
        icon: ArrowBigLeft,
      },
    ],
  },
  {
    title: "Invoices",
    icon: Scroll,
    items: [
      {
        title: "Sales Invoice",
        url: "/dashboard/sale-invoice",
        icon: PackageCheck,
      },
      {
        title: "Purchase Invoice",
        url: "/dashboard/purchase-invoice",
        icon: CreditCard,
      },
    ],
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
    icon: Newspaper,
    items: [
      {
        title: "Sales Report",
        url: "/dashboard/reports/sales",
        icon: PackageCheck,
      },
      {
        title: "Purchase Report",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Expense Report",
        url: "#",
        icon: PackageCheck,
      },
      {
        title: "Income Report",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Inventory Report",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Profit & Loss account",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Balance Sheet",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Sundry debtors",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Sundry Creditors",
        url: "#",
        icon: CreditCard,
      },
    ],
  },
];

export async function DashboardSidebar() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <Sidebar className="pt-16">
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
                    defaultOpen={false}
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
      <SidebarFooter>
        <span className="flex py-3 gap-x-5 items-end px-2 font-semibold">
          <User /> {session.user.email}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
