import { DashboardSidebar } from "@/components/custom/Dashboard/DashboardSidebar";
import { Navbar } from "@/components/custom/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar className="fixed z-50" />
      <SidebarProvider>
        <DashboardSidebar />
        <main className="pt-14 w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
