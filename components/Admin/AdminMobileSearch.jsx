'use client'
import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { Button } from "../ui/button"
import SearchModal from "./SearchModal"
const AdminMobileSearch = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button type="button" size="icon" onClick={()=>setOpen(true)} className={"md:hidden"} variant="ghost">
                <IoIosSearch/>
            </Button>
            <SearchModal open={open} setOpen={setOpen}/>
        </>
    )
}

export default AdminMobileSearch