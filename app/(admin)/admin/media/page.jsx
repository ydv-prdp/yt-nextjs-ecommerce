import BreadCrumb from '@/components/Admin/BreadCrumb'
import UploadMedia from '@/components/Admin/UploadMedia'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute'
import React from 'react'

const breadcrumbData = [
    {href:ADMIN_DASHBOARD, label:'Home'},
    {href:ADMIN_MEDIA_SHOW, label:'Media'},

]

const AdminMediaPage = () => {
  return (
    <div>
        <BreadCrumb breadcrumbData = {breadcrumbData}/>
        <UploadMedia/>
    </div>
  )
}

export default AdminMediaPage