// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const array = [
  {init: "input('hi').then(e=> console.log(e))",name: 'one', output: "<span class='console'>hi1</span><span class='console'>hi1</span><span class='console'>hi1</span><span class='console'>hi1</span>"},
  {init: `
  Promise.all([input('value 1'),input('value 2'),input('value 3')]).then(values => console.log(values))
  `,name: 'two', output: 'qwertyuio'},
  {init: "console.did('hi3')",name: 'three', output: 'qwertyuio'},
  {init: "console.err('hi4')",name: 'four', output: 'qwertyuio'},
  {init: "console.log('hi5')",name: 'five', output: 'qwertyuio'},
  {init: "console.log('hi6')",name: 'six', output: 'qwertyuio'},
]

export default function handler(req, res) {
  setTimeout(() => {
  res.status(200).json({
    array: array
  })
}, 1000)
console.log("done")
}
