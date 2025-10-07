"use client"
import BreadCrumb from "@/components/Admin/BreadCrumb"
import {  ADMIN_DASHBOARD,  ADMIN_PRODUCT_VARIANT_ADD, ADMIN_PRODUCT_VARIANT_EDIT,  ADMIN_PRODUCT_VARIANT_SHOW, ADMIN_TRASH } from "@/routes/AdminPanelRoute"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi"
import Link from "next/link"
import DatatableWrapper from "@/components/Admin/DatatableWrapper"
import { useCallback, useMemo } from "react"
import { columnConfig } from "@/lib/helper"
import {   DT_PRODUCT_VARIANT_COLUMN } from "@/lib/column"
import EditAction from "@/components/Admin/EditAction"
import DeleteAction from "@/components/Admin/DeleteAction"
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: 'Product Variant' },
]
const ShowProductVariant= () => {
  const columns = useMemo(()=>{
    return columnConfig(DT_PRODUCT_VARIANT_COLUMN)
  },[])

  const action = useCallback((row, deleteType, handleDelete)=>{
    let actionMenu =[]
    actionMenu.push(<EditAction key={"edit"} href={ADMIN_PRODUCT_VARIANT_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key={"delete"} handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className={"py-0 gap-0"}>
        <CardHeader className={"pt-2 px-3 border-b [.border-b]:pb-2"}>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Show Product Variants</h4>
            <Button>
              <FiPlus />
              <Link href={ADMIN_PRODUCT_VARIANT_ADD}>
                New Variant
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className={"px-0"}>
            <DatatableWrapper
              queryKey={"product-variant-data"}
              fetchUrl={"/api/productvariant"}
              initialPageSize={10}
              columnsConfig={columns}
              exportEndpoint={"/api/productvariant/export"}
              deleteEndpoint={"/api/productvariant/delete"}
              deleteType={"SD"}
              trashView={`${ADMIN_TRASH}?trashof=productvariant`}
              createAction={action}
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowProductVariant