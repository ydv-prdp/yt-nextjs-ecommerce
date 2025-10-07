"use client"
import BreadCrumb from "@/components/Admin/BreadCrumb"
import {ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute"
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import DatatableWrapper from "@/components/Admin/DatatableWrapper"
import { useCallback, useMemo } from "react"
import { columnConfig } from "@/lib/helper"
import { DT_CATEGORY_COLUMN, DT_COUPON_COLUMN, DT_CUSTOMERS_COLUMN, DT_PRODUCT_COLUMN, DT_PRODUCT_VARIANT_COLUMN, DT_REVIEWS_COLUMN } from "@/lib/column"

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
  },
    product: {
    title:'Product Trash',
    columns:DT_PRODUCT_COLUMN,
    fetchUrl:'/api/product',
    exportUrl:'/api/product/export',
    deleteUrl:'/api/product/delete'
  }
  ,
    "productvariant": {
    title:'Product Variant Trash',
    columns:DT_PRODUCT_VARIANT_COLUMN,
    fetchUrl:'/api/productvariant',
    exportUrl:'/api/productvariant/export',
    deleteUrl:'/api/productvariant/delete'
  },
   coupon: {
    title:'Coupon Trash',
    columns:DT_COUPON_COLUMN,
    fetchUrl:'/api/coupon',
    exportUrl:'/api/coupon/export',
    deleteUrl:'/api/coupon/delete'
  },
  customers: {
    title:'Customers Trash',
    columns:DT_CUSTOMERS_COLUMN,
    fetchUrl:'/api/customers',
    exportUrl:'/api/customers/export',
    deleteUrl:'/api/customers/delete'
  },
    review: {
    title:'Review Trash',
    columns:DT_REVIEWS_COLUMN,
    fetchUrl:'/api/review',
    exportUrl:'/api/review/export',
    deleteUrl:'/api/review/delete'
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