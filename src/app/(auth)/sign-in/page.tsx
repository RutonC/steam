"use client"
// import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'
import { useForm } from "react-hook-form"
import {User} from 'lucide-react'
import InputField from '@/components/input-field'
import Link from 'next/link'
import {Button} from '@/components/ui/button'


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password:z.string()
})


export default function page() {
 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='w-[500px] bg-white border rounded-sm shadow-sm p-12'>
      <h2 className='text-2xl font-semibold'>Bem-vindo de Volta ✌️</h2>
      <p className='text-sm text-secondary font-medium text-slate-400'>Use suas credenciais para aceder sua conta.</p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='mt-4'>
        <InputField name='username' label='Username' control={form.control} placeholder='Username'/>
        <InputField name='password' type='password' label='Palavra-passe' control={form.control} placeholder='Palavra-passe'/>
        </div>
        <p className='text-right'>
        <Link href="/change-password" className='text-primary font-semibold'>Esqueceu palavra-passe?</Link>
        </p>
       
        <Button className='w-full h-12 font-semibold'>Entrar</Button>
      </form>
      </Form>

    </div>
  )
}
