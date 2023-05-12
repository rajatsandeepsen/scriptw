import { PrismaClient } from '@prisma/client'
// import { getToken } from "next-auth/jwt"
const prisma = new PrismaClient()


export default async function handler(req, res) {
    // const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    // const sessionUserName = session?.email.split('@')[0]

    const {incoming} = req.query
    console.log(incoming)

    console.log(req.method)
    if ( req.method === 'PATCH' ) {
        let data = req.body

        const result = await prisma.fileHeader.update({
            where: {id: incoming[0]},
            data: {json: data}
        })
        console.log(data,result)
        res.status(200).json({message: 'Created File'})
    }


    else if ( req.method === 'POST') {

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

    else res.status(404).json({message: 'Wrong request method/parameters'})
}
