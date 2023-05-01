// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const array = [
  {init: "(() => console.log(10 + 2))()",name: 'asdh', output: ""},
  {init: "input('Enter Something').then(e=> console.log(e))",name: 'one', output: ""},
  
  {init: `Promise.all(
    [input('value 1'),input('value 2'),input('value 3')]
  ).then(values => console.log(values))
  `,name: 'two', output: ''},

  {init: `let x = []
  input('Enter Value 1').then(e=> x.push(e))
  input('Enter Value 2').then(e=> {
    x.push(e)
    console.log(x)
  })`,name: 'three', output: ''},

  {init: "console.error('this is an error message')",name: 'four', output: ''},
  {init: "console.add(`<img src='https://www.w3schools.com/html/pic_trulli.jpg' alt='Trulli' width='500' height='333'>`)",name: 'five', output: ''},
  {init: `
  let x = []
  input('hi').then(e=> x.push(e))

setTimeout(()=>{
  input('hi2').then(e=> {
    x.push(e)
    console.log(x)
  })
}, 5000);
  
  `,name: 'six', output: ''},
]

export default function handler(req, res) {
  setTimeout(() => {
  res.status(200).json({
    array: array
  })
}, 1000)
console.log("done")
}
