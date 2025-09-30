import AppSidebar from "@/components/Admin/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const AdminLayout = ({children}) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
          {children}
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout