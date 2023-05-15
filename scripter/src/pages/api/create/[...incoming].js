import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"
const prisma = new PrismaClient()


export default async function handler(req, res) {
    const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    const sessionUserName = session?.email.split('@')[0]

    const {incoming} = req.query
    console.log(incoming, req.method, sessionUserName)

    if (sessionUserName !== incoming[0] || incoming.length < 2) res.status(401).json({message: 'Unauthorized Access'})

    if ( req.method === 'PATCH' ) {
        let data = req.body

        try {
            const result = await prisma.fileHeader.update({
                where: {id: incoming[1]},
                data: {json: data}
            })
            res.status(200).json({message: 'Created File'})
        } catch (error) {
            console.error(error)
            res.status(404).json({message: 'Internal Server Error'})
        }
    }


    else if ( req.method === 'POST') {

        try {
            let data = req.body
            const result = await prisma.fileHeader.create({
                data: {...data,
                        auther: {
                            connect: {name: incoming[0]}    
                        }
                    }
            })
            res.status(200).json({message: 'Created File'})
        } catch (error) {
            console.error(error)
            res.status(404).json({message: 'Internal Server Error'})
        }
    }

    else res.status(404).json({message: 'Wrong request method/parameters'})
}
