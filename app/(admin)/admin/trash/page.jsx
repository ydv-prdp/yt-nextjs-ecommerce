"use client"
import BreadCrumb from "@/components/Admin/BreadCrumb"
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi"
import Link from "next/link"
import DatatableWrapper from "@/components/Admin/DatatableWrapper"
import { useCallback, useMemo } from "react"
import { columnConfig } from "@/lib/helper"
import { DT_CATEGORY_COLUMN } from "@/lib/column"
import EditAction from "@/components/Admin/EditAction"
import DeleteAction from "@/components/Admin/DeleteAction"
import { useSearchParams } from "next/navigation"
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_TRASH, label: 'Trash' },
]


const TRASH_CONFIG = {
  category: {
    title:'Category Trash',
    columns:DT_CATEGORY_COLUMN,
    fetchUrl:'/api/category',
    exportUrl:'/api/category/export',
    deleteUrl:'/api/category/delete'
  }
}
const TrashCategory = () => {
  const searchParams = useSearchParams()
  const trashOf = searchParams.get('trashof')
  const config = TRASH_CONFIG[trashOf]
  console.log(config)
  const columns = useMemo(()=>{
    return columnConfig(config?.columns,false, false,true)
  },[])

  const action = useCallback((row, deleteType, handleDelete)=>{
    return [<DeleteAction key={"delete"} handleDelete={handleDelete} row={row} deleteType={deleteType}/>] 
  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className={"py-0 gap-0"}>
        <CardHeader className={"pt-2 px-3 border-b [.border-b]:pb-2"}>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">{config.title}</h4>
          </div>
        </CardHeader>
        <CardContent className={"px-0"}>
            <DatatableWrapper
              queryKey={`${trashOf}-data-deleted`}
              fetchUrl={config.fetchUrl}
              initialPageSize={10}
              columnsConfig={columns}
              exportEndpoint={config.exportUrl}
              deleteEndpoint={config.deleteUrl}
              deleteType={"PD"}
              createAction={action}
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default TrashCategory