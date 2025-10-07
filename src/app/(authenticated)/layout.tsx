import { AppSidebar } from "@/components/app-components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
