import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"
const prisma = new PrismaClient()



export default async function handler(req, res) {
    const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

    let { id } = req.query;
    if (req.method === 'GET'){
      await throwCells(req, res, id)
      // res.status(200).json({message: 'Updated File'})
    }

    if (req.method === 'POST'){
      if (!session) return res.status(401).json({message: 'Unauthorized Access'})

      await updateFile(req, res, id)
      // res.status(200).json({message: 'Updated File'})

    }
    
}


async function updateFile(req, res, id){
  console.log(req.body)
  // req.body ?? res.status(404).json({message: 'Wrong request method/parameters'})

  for(let element of req.body.update) {
         await forEachCellUpdate(element, res)
  }
  for(let element of req.body.create) {
         await forEachCellCreate(element, id, res)
  }
  // res.status(404).json({message: 'Wrong request method/parameters'})
  
}


async function throwCells(req, res, id){  
    try {
      const cells = await prisma.fileHeader.findUnique({
          where: {
            id: id
          }
  
      }).cells()
      // console.log(cells)
      cells
      ? res.status(200).json(cells)
      : res.status(404).json({ message: "not found" })
    } catch (error) {
      res.status(404).json({message: 'Internal Server Error'})
    }
}


async function forEachCellUpdate(element, res) {
  try {
    const cell = await prisma.cell.update({ 
      where: { id: element.id },
      data: { init: element.init, output: element.output, runs: element.runs || 0 },
    })
  } catch (error) {
    res.status(404).json({message: 'Internal Server Error'})
  }

  // console.log(cell)
}

async function forEachCellCreate(element, id, res) {
  try {
    const cell = await prisma.cell.create({ 
      data: { 
        init: element.init,
        output: element.output,
        type: element.type,
        id: element.id,
        file: {
          connect: { id: id }
        }
       },
    })
  } catch (error) {
    res.status(404).json({message: 'Internal Server Error'})
  }

  // console.log(cell)
}