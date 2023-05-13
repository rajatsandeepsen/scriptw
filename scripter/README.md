```
let domData = document.querySelectorAll('[data-language=json]')[0].innerText
console.log(JSON.parse(domData))
 ```

structured string returns
 `const values = JSON.stringify(dataValue, undefined, 4)`


 use `??` instead of `||`


 ```
{

user: { 
    name: "Rajat Sandeep",
    email: "rajatsandeepsen@gmail.com",
    image: "https://avatars.githubusercontent.com/u/93584596?v=4"
    }
expires: "2023-06-10T09:17:44.802Z"
}
```


```
import { getToken } from "next-auth/jwt"
const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
// const session = await getServerSession(req, res, authOptions)
```