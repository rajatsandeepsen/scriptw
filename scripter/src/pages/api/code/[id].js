import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    let { id } = req.query;
    
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
