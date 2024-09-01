"use client"
import React, { useContext, useEffect, useState } from 'react'
import {Participant, columns} from '@/components/participants/columns'
import { DataTable } from '@/components/participants/Participants'
import { apiURL } from '@/lib/constants'
import { MainContext } from '../context/main.context'
import { Input } from '@/components/ui/input'
function Dashboard() {
  const {setLoading}:any = useContext(MainContext)
 const [data,setData] = useState<any>([])

 const getParticipant = () => {
  setLoading(true);
  
  fetch(`${apiURL.base}/participants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Converte a resposta para JSON
    return response.json();
  })
  .then(data => {
    setData(data.participants);  // Aqui você pode definir os dados recebidos no estado
    setLoading(false);
  })
  .catch(error => {
    console.log(error);
    setLoading(false);
  });
}

 useEffect(()=>{
  getParticipant();
 },[])

  return (
    <div className='px-[20px] py-32'>
      <div className='grid grid-cols-2'>
        
      </div>
      <div className=''>
        <DataTable columns={columns} data={data}/>
      </div>
    </div>
  )
}

export default Dashboard