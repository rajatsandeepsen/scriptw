import { v4 as uuidv4 } from 'uuid';

const array = [
    {init: `// same console.log
let x = 10 + 20
    console.log(x)`, output: '', type:'cell', cellID: uuidv4()},



    {init: `// custom asyc input prompt
let array = [10,20,30]

input("Enter Value")
      .then((value) => {
        array.push(value)
        console.log(array)
      })`, output: '', type:'cell', cellID: uuidv4()},



    {init: `let age = 17

try{ if (age < 18) throw new Error('toooo young') }
      
catch(e){ console.error(e) }
finally { console.log("try again?") }
    
// another console methods`, output: '', type:'cell', cellID: uuidv4()},
{init: "let {url} = get() // reading from JSON\n\nlet HTML = `<img src=${url} alt='img loading?' width='500px'>`\n\nconsole.add(HTML)\n// DOM editor", output: '', type:'cell', cellID: uuidv4()},
{init: "// let bring up a whole website\nlet {sus} = get()\n\nlet HTML = `<iframe src=${sus} height='300px'></iframe>`\n\nconsole.add(HTML)", output: '', type:'cell', cellID: uuidv4()},
{init: `// keyboard shortcuts (awai)

// Execute the current cell (Shift + Enter)
// Execute all the cells (Ctrl + Enter)
// Append new cell (Ctrl + N)

// available all VScode shortcuts`, output: '', type:'cell', cellID: uuidv4()},

{init: `let {x, y, z} = get()

console.log(x, y, z)

console.assert(x > 100 , x + y + z)`, output: '', type:'cell', cellID: uuidv4()},

{init: `let data = {
  name : "Appu",
  age  : 18,
  skills : undefined,
}

set('data', data)
// add data to JSON & access them in next block`, output: '', type:'cell', cellID: uuidv4()},


{init: `let {data} = get() // now access here

console.log(JSON.stringify(data))`, output: '', type:'cell', cellID: uuidv4()},

{init: `// store functions & use it on next cell

function findSum(a, b){ return a + b }
const findSquare = (a,b) => a ** b

setFunc("findSum", findSum)
setFunc("findSquare", findSquare)`, output: '', type:'cell', cellID: uuidv4()},
{init: `// read function
let findSum = getFunc("findSum")

let result = findSum(10, 13)
console.log(result)`, output: '', type:'cell', cellID: uuidv4()},
{init: `async function someFunc(){
  await sleep(1000) // in-build thread sleep
  console.log("After thread sleeping")
}

someFunc()`, output: '', type:'cell', cellID: uuidv4()},

  ]



  const codeDB = new Map()
  codeDB.set('file1', array)
  export default function handler(req, res) {
        let request = req.query.id
        let responce = codeDB.get(request)
        
        responce === undefined ? res.status(404).json({message: 'not found'})
                               : res.status(200).json(responce)
  }
  