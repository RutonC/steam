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
import { toast } from '@/components/ui/use-toast'


const createSendInfo = z.object({
  name:z.string().min(3,"Seu nome deve ser 3 caracteres no mínimo"),
  email:z.string().email("Email inválido"),
  phone:z.string().regex(new RegExp("^(84|85|87|86|83|82)[0-9]{0,7}/*$"),"Número inválido!"),
  address:z.string(),
   check:z.string().refine(val => val === 'on', {
    message: "Você deve aceitar as políticas de privacidade"}),
})

type CreateSendInfo = z.infer<typeof createSendInfo>

function Subscription() {
  const [loading, setIsLoading] = useState<boolean>(false);

  const {register,handleSubmit, formState:{errors}} = useForm<CreateSendInfo>({
    resolver:zodResolver(createSendInfo)
  });

  const handleSend = async (values:CreateSendInfo) =>{
   setIsLoading(true);
   fetch("https://api.emailjs.com/api/v1.0/email/send",
      {
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          "service_id": "service_kunuj3r",
    "template_id": "template_mboqt2i",
    "user_id": "j4jq9L4NzPnJmcWUw",
    "template_params": {
			"from_name":"edmilton@comunika.co.mz",
			"to_name":"inscricao@comunika.co.mz",
       "message":`${values.name}, ${values.phone}, ${values.email}, ${values.address} `
		}
        })
      }
    ).then(data=> {
      console.log("Dados sao: ", data);
      if(data.status === 200){
        toast({
          title:"Dados de Inscrição",
          description:"Seus dados de inscrição foram enviados com sucesso! Entraremos em contacto brevemente."
        });
        setIsLoading(false);
      }else{
        toast({
          title:"Erro",
          description:"Ocorreu um erro durante o envio dos dados. Tente mais tarde!"
        });
        setIsLoading(false);
      }
    }).catch(error => {
      console.log(error)
    })

    

   
  }
  return (
    <div className='back h-full w-screen flex items-center justify-center '>
      <div className='grid md:grid-cols-3 grid-cols-1 shadow-sm w-2/3'>
        <SideLeft/>
        <div className='bg-slate-100/30 backdrop-blur-sm col-span-2 py-16 px-12 mds md:px-36'>
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
                <Checkbox {...register("check")} className='mr-4 ' />
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
              <Button disabled={loading} className={`bg-colorTwo hover:bg-colorFive ${loading ?? 'bg-slate-500'}`}>
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