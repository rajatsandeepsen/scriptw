import { PrismaClient } from "@prisma/client";
// import { files } from "./src/pages/api/header/[fileName]";
import { data } from "../data/data.js";

const prisma = new PrismaClient();
const id = 'f4997044-dbcf-40d0-ab22-18bbeb72c440'
async function main(){
    

    const newPost = await prisma.Cell.create({
        data: {
            type: "markdown",
            init: "### Double click to Edit/Save\n",
            output: "",
            fileId: {
                connect: {id: id}
            }
        },
      })
}

main()
    .catch(e => {console.error(e); process.exit(1)})
    .finally( async ()=> await prisma.$disconnect())
