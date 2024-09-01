"use client"
import {ChevronFirst, LogOut, Settings} from "lucide-react"
import UserItem from "./user-item"
import SidebarItem from "./sider-item"
import { Button } from "./ui/button"
import { Popover, PopoverTrigger } from "./ui/popover"
import { PopoverContent } from "@radix-ui/react-popover"
import { useContext } from "react"
import { MainContext } from "@/app/context/main.context"

export default function Sidebar(){
  const {logout}:any = useContext(MainContext)
  return(
    <aside className="fixed flex flex-col h-screen w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div className=""><UserItem/></div>
      <div className="grow">
        <SidebarItem/>
      </div>
      <div className="flex flex-row w-full">
        
        <button className="flex flex-row gap-2 border text-left w-full p-4 " onClick={()=>logout()} >
          <LogOut strokeWidth={1}/>
          Logout
        </button>
      </div>
    </aside>
  )
}