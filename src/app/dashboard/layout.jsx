import { DashboardSidebar } from "@/components/custom/Dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }) => {
  return (
    <div className="w-full">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="pt-14 w-full">
          <SidebarTrigger className="fixed" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
