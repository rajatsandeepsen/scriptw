import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function forEachCellUpdate(element) {
  const cell = await prisma.cell.update({ 
    where: { id: element.id },
    data: { init: element.init, output: element.output },
  })

  // console.log(cell)
}

async function forEachCellCreate(element, id) {
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

  // console.log(cell)
}

export default async function handler(req, res) {
    let { id } = req.query;
    if (req.method === 'GET'){
      throwCells(req, res, id)
    }

    if (req.method === 'POST'){
      updateFile(req, res, id)

    }
    
}


async function updateFile(req, res, id){
  console.log(req.body)
  req.body && req.body.update.forEach((element,) => {
    forEachCellUpdate(element)
  })
  req.body && req.body.create.forEach((element,) => {
    forEachCellCreate(element, id)
  })

  res.status(200).json({message: 'Updated File'})
}


async function throwCells(req, res, id){  
    const cells = await prisma.fileHeader.findUnique({
        where: {
          id: id
        }

    }).cells()
    // console.log(cells)
    cells
    ? res.status(200).json(cells)
    : res.status(404).json({ message: "not found" })
}


