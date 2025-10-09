import AppSidebar from "@/components/Admin/AppSidebar"
import ThemeProvider from "@/components/Admin/ThemeProvider"
import Topbar from "@/components/Admin/Topbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Copyright } from "lucide-react"

const AdminLayout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange

    >
      <SidebarProvider>
        <AppSidebar />
        <main className="md:w-[calc(100vw-16rem)] w-full">
          <div className="pt-[70px] md:px-8 px-5 min-h-[calc(100vh-40px)] pb-10">
            <Topbar />
            {children}
          </div>
          <div className="border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm">
            <Copyright className="h-3 w-3" /> {new Date().getFullYear()} Pradeep Yadav. All Rights Reserved
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AdminLayout