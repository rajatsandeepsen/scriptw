import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const prisma = new PrismaClient()
    let request = req.query.fileName.trim()

    if (request === '' || !request)
        res.status(404).json({message: 'File Not Found'})

    const file = await prisma.fileHeader.findUnique({
      where: {
        id: request
      }
    })
    console.log(file, request)
  
    res.status(200).json(file)
  }
  