"use client"
import React, { useState } from 'react'
import {Presentation, Computer, Cog} from 'lucide-react'
import {Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import SideLeft from '@/components/side-left'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ModalPrivacy } from '@/components/modal-privacy'


const createSendInfo = z.object({
  name:z.string().min(3,"Seu nome deve ser 3 caracteres no mínimo"),
  email:z.string().email("Email inválido"),
  phone:z.string().regex(new RegExp("^(84|85|87|86|83|82)[0-9]{0,7}/*$"),"Número inválido"),
  address:z.string(),
   check:z.string().refine(val => val === 'checked', {
    message: "Você deve aceitar as políticas de privacidade"}),
})

type CreateSendInfo = z.infer<typeof createSendInfo>

function Subscription() {
  const [checked, setChecked] = useState();

  const {register,handleSubmit, formState:{errors}} = useForm<CreateSendInfo>({
    resolver:zodResolver(createSendInfo)
  });

  const handleSend = (values:CreateSendInfo) =>{
    console.log(values)
  }

  console.log(checked)
  return (
    <div className='back h-full w-screen flex items-center justify-center px-72'>
      <div className='grid md:grid-cols-3 grid-cols-1 shadow-sm'>
        <SideLeft/>
        <div className='bg-slate-100/30 backdrop-blur-sm col-span-2 py-16 px-36'>
         <div>
          <span className='font-bold text-3xl'>Subscreva-se a <br/><span className='text-colorOne'>S</span><span className='text-colorTwo'>T</span><span className='text-colorThree'>E</span><span className='text-colorFour'>A</span><span className='text-colorFive'>M</span></span>

          <form onSubmit={handleSubmit(handleSend)} className='space-y-4 mt-8'>

            <div>
            <Label htmlFor='name' className='text-sm font-medium text-colorFive'>Nome completo</Label>
            <Input {...register("name")} id="name" type='text' placeholder='Seu nome completo' className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'/>
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className='grid grid-cols-2 gap-4'>
            <div>
            <Label htmlFor='phone' className='text-sm font-medium text-colorFive'>Número com whatsapp</Label>
            <Input {...register("phone")} id="phone" type='text' placeholder='Número com whatsapp' className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'/>
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>
            <div>
            <Label htmlFor='email' className='text-sm font-medium text-colorFive'>E-mail</Label>
            <Input {...register("email")} id="email" type='email' placeholder='Seu email' className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'/>
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            </div>
            <div>
            <Label htmlFor='address' className='text-sm font-medium text-colorFive'>Endereço</Label>
            <Input {...register("address")} id="address" type='text' placeholder='Seu endereço' className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'/>
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>
            <div className='grid grid-cols-3'>
              <div className='col-span-2'>
                <div className='flex flex-row justify-items-center items-center'>
                <Checkbox checked={checked} onCheckedChange={(checked)=>setChecked} className='mr-4 ' />
               <span className='text-sm text-gray-400'>
               Aceita com todas nossas <Dialog>
                <DialogTrigger>
               <span className='text-colorTwo cursor-pointer'> Políticas de Privacidade</span>
                </DialogTrigger>
                <ModalPrivacy message='lo'/>
               </Dialog> 
                </span> 
                </div>
                {errors.check && <span className="text-red-500 text-sm">{errors.check.message}</span>}
              </div>
              <Button className='bg-colorTwo hover:bg-colorFive'>
                Enviar
              </Button>
            </div>

          </form>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription