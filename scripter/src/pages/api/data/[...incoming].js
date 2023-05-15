import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const sessionUserName = session?.email.split("@")[0];

  // if(!session) return res.status(401).json({message: 'Unauthorized Access'})
  const prisma = new PrismaClient();

  let { incoming } = req.query;

  incoming.map((item, index) => {
    incoming[index] = item.trim();
  });
  console.log(incoming);
  if (incoming.length === 1) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name: { equals: incoming[0] },
        },
        select: {
          name: true,
          files: {
            select: {
              id: true,
              name: true,
              title: true,
              description: true,
              visibility: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      // excisting user
      if (user) {
        if (user.name === sessionUserName) {
          // user fetch own data
          user.email = session.email;
          user.image = session.picture;
        } else
          user.files = user.files.filter((item) => {
            if (item.visibility) return item;
          });

        res.status(200).json(user);
      }

      // creating new user
      else if (sessionUserName === incoming[0]) {
        const newUser = await prisma.user.create({
          data: { name: sessionUserName },
        });
        console.log(newUser, sessionUserName);
        res.status(200).json({ ...newUser, files: [] });
      }

      // found non
      else res.status(404).json({ message: "User Not Found" });

      // console.log(user)
    } catch (error) {
      res.status(404).json({ message: "Internal Server Error" });
    }
  } else if (incoming.length === 2) {
    try {
      const AllFiles = await prisma.user
        .findFirst({
          where: {
            name: { equals: incoming[0] },
          },
        })
        .files({
          select: {
            id: true,
            name: true,
            title: true,
            description: true,
            visibility: true,
            createdAt: true,
            updatedAt: true,
            json: true,
          },
        });

      const file = AllFiles?.find((item) => {
        if (item.name === incoming[1]) return item;
      });

      if (sessionUserName === incoming[0] && file)
        res.status(200).json({ ...file, edit: true });
      else if (file && file.visibility)
        res.status(200).json({ ...file, edit: false });
      else res.status(404).json({ message: "File Not Found" });
    } catch (error) {
      res.status(404).json({ message: "Internal Server Error" });
    }
  } else res.status(404).json({ message: "Wrong request parameters" });
}
