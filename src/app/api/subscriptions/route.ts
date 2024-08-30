import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, phoneNumber, address, email } = req.body;

    try {
      const response = await prisma.participants.create({
        data: {
          name: name,
          phoneNumber: phoneNumber,
          address: address,
          email: email,
        },
      });

      return res.status(201).json({ participant: response });
    } catch (error) {
      console.error("Erro ao criar participante:", error);
      return res.status(500).json({ error: "Erro ao criar participante" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}


export async function GET(req:NextApiRequest, res:NextApiResponse){

}