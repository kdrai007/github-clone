import { NavigationSidebar } from "@/components/navbar/navigation-sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full z-30 w-[72px] flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};
export default MainLayout;
