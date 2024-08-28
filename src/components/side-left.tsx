import { Cog, Computer, Presentation } from "lucide-react";

export default function SideLeft(){
  return(
    <div className='order-last md:order-first flex flex-col gap-4 sm:gap-6 md:gap-8 bg-colorFive/30 backdrop-blur-sm px-6 py-10 sm:px-8 sm:py-14 md:px-12 md:py-20'>
    <div className='flex flex-row justify-center gap-2 sm:gap-4'>
      <div className='log p-4 sm:p-5 md:p-6 bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
        <Presentation strokeWidth={1} width={24}  className='text-white w-[24px] sm:w-[28] md:w-[30]'/>
      </div>
      <p className='text-xs sm:text-sm text-slate-500'>
        Aqui, você aprenderá os conceitos essenciais de robótica e tecnologia.
      </p>
    </div>
    
    <div className='flex flex-row justify-center gap-2 sm:gap-4'>
      <div className='log p-4 sm:p-5 md:p-6 bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
        <Computer strokeWidth={1} width={24}  className='text-white w-[24px] sm:w-[28] md:w-[30] '/>
      </div>
      <p className='text-xs sm:text-sm text-slate-500'>
        Mergulhe na prática e descubra o poder da programação!
      </p>
    </div>
    
    <div className='flex flex-row justify-center gap-2 sm:gap-4'>
      <div className='log p-4 sm:p-5 md:p-6 bg-colorFive/20 rounded-sm flex justify-items-center items-center justify-center'>
        <Cog strokeWidth={1} width={24} className='text-white w-[24px] sm:w-[28] md:w-[30]'/>
      </div>
      <p className='text-xs sm:text-sm text-slate-500'>
        Com as ferramentas certas, você criará e programará robôs que trarão inovação e diversão ao seu aprendizado.
      </p>
    </div>
  </div>
  
  )
}