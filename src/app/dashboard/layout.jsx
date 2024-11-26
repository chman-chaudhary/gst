import { DashboardSidebar } from "@/components/custom/Dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }) => {
  return (
    <div className="w-full">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger className="fixed mt-[4.2rem]" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
