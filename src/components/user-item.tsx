"use client"
import { MainContext } from '@/app/context/main.context'
import React,{useContext} from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarIcon } from '@radix-ui/react-icons';

export default function UserItem() {
  const {user}:any = useContext(MainContext);
  const name = user?.username || "CK";
  const firstLetter = name[0]; // Primeira letra
  const seventhLetter = name[6]; // Sétima letra

  return (
    <div className='flex flex-row gap-4 items-center border rounded-sm p-2'>
      <Avatar>
      <AvatarFallback className=' bg-colorFive text-xl text-white uppercase'>
        {`${firstLetter} ${seventhLetter}`}
      </AvatarFallback>
      </Avatar>
      <div>
        <p className='text-xl font-semibold capitalize text-colorFive'>{user?.username}</p>
        <p className='text-sm text-gray-500'>{user?.email}</p>
      </div>
    </div>
  )
}
