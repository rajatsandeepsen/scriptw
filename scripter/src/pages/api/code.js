// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const array = [
  {init: "const pp = (hi)=> console.log(hi) \npp('hello')",id: 'one', output: ''},
  {init: "pp('hello2')",id: 'two', output: ''},
  {init: "console.log('hi3')",id: 'three', output: ''},
  {init: "console.log('hi4')",id: 'four', output: ''},
  {init: "console.log('hi5')",id: 'five', output: ''},
  {init: "console.log('hi6')",id: 'six', output: ''},
]

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json({
      array: array
    })
  }, 1000)
}
