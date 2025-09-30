'use client'
import { Button } from "../ui/button"
import { useSidebar } from "../ui/sidebar";
import ThemeSwitch from "./ThemeSwitch"
import UserDropDown from "./UserDropDown"
import { RiMenu4Fill } from "react-icons/ri";

const Topbar = () => {
    const {toggleSidebar} = useSidebar()
  return (
    <div className="fixed border h-14 w-full left-0 md:w-[calc(100vw-16rem)] top-0 md:left-64 px-5 z-30 md:ps-72 flex justify-between items-center bg-white dark:bg-card">
        <div>
            search components
        </div>
        <div className="flex items-center gap-2">
            <ThemeSwitch/>
            <UserDropDown/>
            <Button onClick={toggleSidebar} type="button" size={"icon"} className={"ms-2 md:hidden"} >
                <RiMenu4Fill/>
            </Button>
        </div>
    </div>
  )
}

export default Topbar