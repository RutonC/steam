import { Input } from '@/components/ui/input'
import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'

interface InputProps {
  control:any,
  name:string,
  label?:string,
  placeholder:string
  type?: string
}
function InputField({control, name, label, placeholder,type}:InputProps) {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='mt-4'>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} type={type} className='h-12 rounded-sm' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default InputField