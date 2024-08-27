import { Cog, Computer, Presentation } from "lucide-react";

export default function SideLeft(){
  return(
    <div className='flex flex-col gap-8 bg-colorFive/30 backdrop-blur-sm px-12 py-20'>
          <div className='flex flex-row justify-center gap-4'>
          <div className='p-6 bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
            <Presentation strokeWidth={1} width={30} className=' text-white'/>
          </div>
            <p className='text-sm text-slate-500'>Aqui, você aprenderá os conceitos essenciais de robótica e tecnologia.</p>
          </div>
          <div className='flex flex-row justify-center gap-4'>
            <div className='p-6 bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
            <Computer strokeWidth={1} width={30} className=' text-white '/>
            </div>
            <p className='text-sm text-slate-500'>Mergulhe na prática e descubra o poder da programação!</p>
          </div>
          <div className='flex flex-row justify-center gap-4'>
          <div className='p-6  bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
            <Cog strokeWidth={1} width={30} className=' text-white'/>
          </div>
            <p className='text-sm text-slate-500'>Com ferramentas certas, você criará e programará robôs que trarão inovação e diversão ao seu aprenduzado.</p>
          </div>
        </div>
  )
}