export const data = [
  {
    init: `// same console.log
let x = 10 + 20
    console.log(x)`,
    output: "",
    type: "cell",

  },
  {
    init: "### Javascript Language Emmit (Auto-Completion)\n> Bracket pairing\n\n>State & Methods\n\neg\n:  \n type `for` and `Enter ↩`\n",
    output: "",
    type: "markdown",

  },

  {
    init: `// custom asyc input prompt
let array = [10,20,30]

input("Enter Value")
      .then((value) => {
        array.push(value)
        console.log(array)
      })`,
    output: "",
    type: "cell",

  },

  {
    init: `let age = 17

try{ if (age < 18) throw new Error('toooo young') }
      
catch(e){ console.error(e) }
finally { console.log("try again?") }
    
// another console methods`,
    output: "",
    type: "cell",

  },
  {
    init: "let {url} = get() // reading from JSON\n\nlet HTML = `<img src=${url} alt='img loading?' width='100%'>`\n\nconsole.add(HTML)\n// DOM editor",
    output: "",
    type: "cell",

  },
  {
    init: "// let bring up a whole website\nlet {sus} = get()\n\nlet HTML = `<iframe src=${sus} height='300px'></iframe>`\n\nconsole.add(HTML)",
    output: "",
    type: "cell",

  },
  {
    init: `### Available all VScode shortcuts 

eg
:

> Execute the current cell \`Shift + Enter\`

> Execute all the cells \`Ctrl + Enter\`

> Append new cell \`Ctrl + N\``,
    output: "",
    type: "markdown",

  },

  {
    init: `let {x, y, z} = get()

console.log(x, y, z)

console.assert(x > 100 , x + y + z)`,
    output: "",
    type: "cell",

  },

  {
    init: `let data = {
  name : "Appu",
  age  : 18,
  skills : undefined,
}

set('data', data)
// add data to JSON & access them in next block`,
    output: "",
    type: "cell",

  },

  {
    init: `let {data} = get() // now access here

console.assert(data, "data is undefined")
console.log(JSON.stringify(data))`,
    output: "",
    type: "cell",

  },

  {
    init: `// store functions & use it on next cell

function findSum(a, b){ return a + b }
const findSquare = (a,b) => a ** b

setFunc("findSum", findSum)
setFunc("findSquare", findSquare)`,
    output: "",
    type: "cell",

  },
  {
    init: `// read function
let findSum = getFunc("findSum")

let result = findSum(10, 13)
console.log(result)`,
    output: "",
    type: "cell",

  },
  {
    init: `async function someFunc(){
  await sleep(1000) // in-build thread sleep
  console.log("After thread sleeping")
}

someFunc()`,
    output: "",
    type: "cell",

  },]


  export const fileHeader = [
    {"autherId":"78f3a86b-5dfc-4535-8147-d61601fd8aba","id":"f4997044-dbcf-40d0-ab22-18bbeb72c440","name":"file1","title":"ScriptW (beta)","description":"Script Writer<br>In-Browser Jupyter Notebook Alternative for JavaScript.<br>Browser only, No Node.js, No Notebook Kernels, No Server required","json":{"x":10,"y":20,"z":30,"sus":"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1","url":"https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600","chartjs":"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js","braindotjs":"https://unpkg.com/brain.js@2.0.0-beta.23/dist/browser.js"},"visiiblity":false,"createdAt":null,"updatedAt":null},
    {"autherId":"78f3a86b-5dfc-4535-8147-d61601fd8aba","id":"8a1bd74e-6af2-48e9-a462-0097704d4e28","name":"newFile","title":"another file","description":"another file for running js","json":{},"visiiblity":false,"createdAt":null,"updatedAt":null}
  ]