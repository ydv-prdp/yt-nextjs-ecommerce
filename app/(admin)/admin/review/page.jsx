"use client"
import BreadCrumb from "@/components/Admin/BreadCrumb"
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute"
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import DatatableWrapper from "@/components/Admin/DatatableWrapper"
import { useCallback, useMemo } from "react"
import { columnConfig } from "@/lib/helper"

import DeleteAction from "@/components/Admin/DeleteAction"
import { DT_REVIEWS_COLUMN } from "@/lib/column"
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: '', label: 'Review' },
]
const ShowReview = () => {
  const columns = useMemo(()=>{
    return columnConfig(DT_REVIEWS_COLUMN)
  },[])

  const action = useCallback((row, deleteType, handleDelete)=>{
    let actionMenu =[]
    actionMenu.push(<DeleteAction key={"delete"} handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className={"py-0 gap-0"}>
        <CardHeader className={"pt-2 px-3 border-b [.border-b]:pb-2"}>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Reviews</h4>
          </div>
        </CardHeader>
        <CardContent className={"px-0"}>
            <DatatableWrapper
              queryKey={"review-data"}
              fetchUrl={"/api/review"}
              initialPageSize={10}
              columnsConfig={columns}
              exportEndpoint={"/api/review/export"}
              deleteEndpoint={"/api/review/delete"}
              deleteType={"SD"}
              trashView={`${ADMIN_TRASH}?trashof=review`}
              createAction={action}
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowReview