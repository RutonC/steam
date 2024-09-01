"use client"
import React from "react";
import {Command, CommandInput, CommandGroup, CommandList, CommandItem, CommandSeparator} from './ui/command'
import {LayoutDashboard, Ticket, Settings} from 'lucide-react'
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  text:string
  icon:React.ReactNode
  active?:boolean
  alert?:React.ReactNode

}

export default function SidebarItem(){
  const menuList = [
    {
      group:"Geral",
      items:[
        {link:'/dashboard',icon:<LayoutDashboard strokeWidth={1} className="text-red-700"/>, text:'Inicio'},
        // {link:'/participants-list',icon:<Ticket/>, text:'Participantes'},
        // {link:'/settings',icon:<Settings/>, text:'Configurações'},
      ]
    }
  ]

  const runCommand = React.useCallback((command: () => unknown) => {
    // setOpen(false)
    command()
  }, [])

  const route = useRouter(); 

  return(
   <Command>
    <CommandList>
      {menuList.map((menu:any, key:number)=>
      <CommandGroup key={key} heading={menu.group}>
      {menu.items.map((item:any,key:number) =>
      <CommandItem key={key} className="flex flex-row items-center gap-x-2 text-md cursor-pointer"
      onSelect={()=>{
        runCommand(()=> route.push(item.link as string))
      }}>
        {item.icon}
        {item.text}
      </CommandItem>
      )
      }
      </CommandGroup>
      )
      }
    </CommandList>
   </Command>
  )
}