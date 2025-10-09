'use client'
import { useState } from "react"
import { Input } from "../ui/input"
import { IoIosSearch } from "react-icons/io"
import SearchModal from "./SearchModal"

const AdminSearchComp = () => {
     const [open, setOpen] = useState(false)
  return (
    <div className="md:w-[350px]">
        <div className="relative flex items-center justify-center">
            <Input
                readOnly
                className={"rounded-full cursor-pointer"}
                placeholder="Search..."
                onClick={()=>setOpen(true)}
            />
            <button type="button" className="absolute right-3 cursor-default">
                <IoIosSearch/>
            </button>
        </div>
        <SearchModal open={open} setOpen={setOpen}/>
    </div>
  )
}

export default AdminSearchComp