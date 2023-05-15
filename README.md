<img alt='mockupimage' src='https://scriptw.vercel.app/mockup.png' style='background-color: white; outline: 2px solid #fff; border-radius: 30px;'>

# [Script Writer](https://scriptw.vercel.app/) v1.0.1 stable release
### In-Browser Jupyter Notebook Alternative for Javascript | by [@rajatsandeepsen](https://github/rajatsandeepsen)



### Tech Stack & Tools used to build this project
- Build with Nextjs, React, Bootstrap and Prisma
- Deployed on Vercel & Planetscale MySQL DB
- Authentication using Github OAuth & Next-Auth
- Javascript, Sass, SQL
- uiw/Codemirror, useSWR hooks etc.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![PlanetScale](https://img.shields.io/badge/planetscale-%23000000.svg?style=for-the-badge&logo=planetscale&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)


### Features

- In-Browser Javascript Notebook
- Save and Load Notebooks
- Share Notebooks
- Export/Print Notebooks as PDF
- Login using Github 
- VS code similar UI & Keyboard Shortcuts
- Code Autocomplete (Emmet), Syntax Highlighting & Bracket pairing
- Visibility of Notebook (Public/Private)
- Code Execution & Code Output
- JSON state management section
- Code & Markdown support
- ChatGPT integration for code suggestions (Coming Soon)
- Build Websites using HTML, CSS & JS (Bug Fixing)
- Build single file/page React Apps (Coming Soon)


### Additional Function for state control
- `set( )` - set a variable in JSON state file 
- `get( )` - get a variable from JSON state file
- `setFunc( )` - set a function in JSON state file
- `getFunc( )` - get a function from JSON state file
- `importPackage( )` - async function to import CDN packages
- `input( )` - async function to take input from user
- `sleep( )` - async function to sleep the main thread

### console functions
- `console.log( )` - log to console
- `console.clear( )` - clear console
- `console.error( )` - log error to console
- `console.assert( )` - log assertion to console
- `console.add( )` - append HTML elements to console
- others are coming soon

### Unavailable functions & methods
- `import`
- `export`
- `require`


## Examples
- add data to JSON & access them in next block
```
let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
set('url', url)
```
```
let { url } = get() // reading from JSON
let HTML = `<img src=${url} alt='img loading?' width='100%'>`
console.add(HTML)
```

- import CDN packages
```
let url = 'https://unpkg.com/brain.js@2.0.0-beta.23/dist/browser.js'

importPackage(url, () => {
  
  const network = new brain.NeuralNetwork();

  network.train([
    {input:[0,0], output:{zero:1}},
    {input:[0,1], output:{one:1}},
    {input:[1,0], output:{one:1}},
    {input:[1,1], output:{zero:1}},
  ]);

  // What is the expected output of [1,0]?
  let result = network.run([1,0]);
  for (let [key, value] of Object.entries(result)) {
    console.log(`${key}: ${value}`)
  }

})
```

- store functions & use it on next cell
```
function findSum(a, b){ return a + b }

setFunc("findSum", findSum)
```
```
let findSum = getFunc("findSum")

let result = findSum(10, 13)
console.log(result)
```
- sleep the main thread
```
async function someFunc(){
  await sleep(1000)
  console.log("After thread sleeping")
}

someFunc() 
```

