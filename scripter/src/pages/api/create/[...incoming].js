import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    const {incoming} = req.query
    console.log(incoming)

    
    if (req.method !== 'POST' || !incoming || incoming.length > 2) res.status(404).json({message: 'Wrong request method/parameters'})


    // if (incoming.length === 1) {
    //     let data = req.body
    //     const result = await prisma.user.create({
    //         data: {...data,
    //             }
    //     })
    //     console.log(result)
    //     res.status(200).json({message: 'Created File'})
    // }

    if (incoming.length === 2) {

        let data = req.body
        const result = await prisma.fileHeader.create({
            data: {...data,
                    auther: {
                        connect: {name: incoming[0]}    
                    }
                }
        })
        console.log(result)
        res.status(200).json({message: 'Created File'})
    }
    
}
