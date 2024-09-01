"use client"
import {
 ColumnDef,
 flexRender,
 getCoreRowModel,
 getPaginationRowModel,
 useReactTable,
 getFilteredRowModel
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import {ChevronLeft, ChevronRight} from 'lucide-react' 
import {Input} from '@/components/ui/input'
import { useState } from 'react'


interface DataTableProps<TData, TValue>{
  columns:ColumnDef<TData, TValue>[]
  data:TData[]
}

export function DataTable<TData,TValue>({
  columns,
  data
}:DataTableProps<TData,TValue>){
  const [filter, setFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    state:{
      globalFilter:filter
    },
    onGlobalFilterChange:setFilter
  })

  return (
    <div>
      <div className='grid grid-cols-2'>
    <Input value={filter} onChange={e=>setFilter(e.target.value)} placeholder='Pesquisar por participante'  className="my-4 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo" />
      </div>
    
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup)=> (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header)=>{
                return(
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null :flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row)=>(
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {
                    row.getVisibleCells().map((cell)=>(
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell,cell.getContext())}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      {/* Adicionar paginacao */}

    </div>
      <div className='flex flex-row items-end justify-end py-[16px] gap-x-2'>
      <Button variant="outline" onClick={()=> table.previousPage()}>
        <ChevronLeft strokeWidth={1}/>
      </Button>
      <Button variant="outline" onClick={()=> table.nextPage()}>
          <ChevronRight strokeWidth={1}/>
      </Button>
      </div>
    </div>
  )
}