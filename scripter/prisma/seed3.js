import { PrismaClient } from "@prisma/client";
// import { files } from "./src/pages/api/header/[fileName]";
import { data, fileHeader } from "../data/data.js";

const prisma = new PrismaClient();
let userid = "195b67f3-6ad9-48dd-86f3-ff9d7a544c66" , fileid = "852a367c-4d4b-4e99-ad7f-f5c5cfe6a815"

async function main3() {
  const user = await prisma.user.create({
    data: {
      name: "rajat",
      email: "rajatsandeepsen1839@gmail.com",
      password: "123456789",
      id : "195b67f3-6ad9-48dd-86f3-ff9d7a544c66"
    },
  });
}

main3().catch((e) => {
  console.error(e);
  process.exit(1);
});

async function main2(i) {
  const single = i;

  const newPost = await prisma.fileHeader.create({
    data: {
      title: single.title,
      name: single.name,
      description: single.description,
      json: single.json,
      autherId: userid,
    },
  });

  fileid.push(newPost.id)
}

fileHeader.forEach((item) => {
  main2(item).catch((e) => {
    console.error(e);
    process.exit(1);
  });
});

async function main(i) {
  const single = i;

  const newPost = await prisma.Cell.create({
    data: {
      type: single.type,
      init: single.init,
      output: single.output,
      fileId: fileid,
    },
  });
}

data.forEach((item) => {
  main(item)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
});
