import { EmailTemplate } from '@/components/EmailTemplate';
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(){
  try{
    const {data,error} = await resend.emails.send({
      from:'Acme <edmilton@comunika.co.mz>',
      to:['evidencio@comunika.co.mz','nuria@comunika.co.mz', 'edmilton.mendes13@gmail.com'],
      subject:'Dados de inscrição',
      react: EmailTemplate({firstName:'Teste de envio'}),

    });

    if(error){
      return Response.json({error},{status:500});
    }

    return Response.json(data);
  }catch(error){
    return Response.json({error},{status:500})
  }
}