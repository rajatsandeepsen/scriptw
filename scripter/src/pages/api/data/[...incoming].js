import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    let { incoming } = req.query;

    incoming.map((item, index) => {
        incoming[index] = item.trim()
    })
    // console.log(incoming)
    if (incoming.length === 1){
        const user = await prisma.user.findFirst({
            where: {
              name: {equals:incoming[0]}
            },
            select: {
              name: true,
              password: false,
              email: true,
            }
          })

        user ? res.status(200).json(user) : res.status(404).json({message: 'User Not Found'})
    }
    else if (incoming.length === 2){
        const AllFiles = await prisma.user.findFirst({
            where: {
              name: {equals: incoming[0]},
            },
          })
          .files()


          const file = AllFiles?.find((item) => {
                if (item.name === incoming[1])
                    return item
          })
          
          file ? res.status(200).json(file) : res.status(404).json({message: 'File Not Found'})
        
    }
    else res.status(404).json({message: 'Wrong request parameters'})


  }
  