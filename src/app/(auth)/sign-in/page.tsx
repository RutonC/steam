"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'
import { useForm } from "react-hook-form"
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { apiURL } from '@/lib/constants'
import {useRouter} from 'next/navigation'


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password:z.string()
})


type CreateFormSchema = z.infer<typeof formSchema>;

export default function SignIn() {
 
  const {push} = useRouter();
  const {register, handleSubmit, formState:{errors}} = useForm<CreateFormSchema>({
    resolver:zodResolver(formSchema)
  });


 async function onSubmit(values:CreateFormSchema) {
    console.log(values);
    try {
      const response = await fetch(`${apiURL.base}/sign-in`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:values.username,
          password:values.password
        })
      });

      const data = await response.json();
      console.log("Login",data);

      if(response.status === 500 || response.status === 404){
        console.log("Senha ou usuário incorrento")
      }else{
        push('/dasboard');
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='w-[500px] bg-white border rounded-sm shadow-sm p-12'>
      <h2 className='text-2xl font-semibold'>Bem-vindo de Volta ✌️</h2>
      <p className='text-sm text-secondary font-medium text-slate-400'>Use suas credenciais para aceder sua conta.</p>     
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
        <div>
        <Label htmlFor='name' className='text-sm font-medium text-colorFive'>
              Email ou username
        </Label>
        <Input
                {...register("username")}
                id="username"
                type='text'
                placeholder='Email ou username'
                className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'
              />
                </div>
                <div>
                <Label htmlFor='name' className='text-sm font-medium text-colorFive'>
              Password
            </Label>
        <Input
                {...register("password")}
                id="password"
                type='password'
                placeholder='Password'
                className='mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo'
                />
                </div>

        
        <p className='text-right'>
        <Link href="/change-password" className='text-primary font-semibold'>Esqueceu palavra-passe?</Link>
        </p>
       
        <Button className='w-full h-12 font-semibold'>Entrar</Button>
      </form>
    </div>
  )
}
