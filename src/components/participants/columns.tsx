import {ColumnDef} from '@tanstack/react-table'

export type Participant = {
  id:string
  name:string
  email:string
  phoneNumber:string
  address:string
  createdAt:string
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
  }).format(date);
}


export const columns:ColumnDef<Participant>[] = [
  {
    accessorKey:'name',
    header:'Nome Completo'
  },
  {
    accessorKey:'email',
    header:'Email'
  },
  {
    accessorKey:'phoneNumber',
    header:'Número de telefone'
  },
  
  {
    accessorKey:'address',
    header:'Endereço'
  },
  {
    accessorKey:'createdAt',
    header:'Data da Inscrição',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },


]