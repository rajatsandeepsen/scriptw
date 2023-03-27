// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const array = [
  {init: "console.log('hi1')",name: 'one', output: '<span>&gt; hi1</span><span>&gt; hi1</span><span>&gt; hi1</span><span>&gt; hi1</span>'},
  {init: "console.error('hi2')",name: 'two', output: 'qwertyuio'},
  {init: "console.did('hi3')",name: 'three', output: 'qwertyuio'},
  {init: "console.log('hi4')",name: 'four', output: 'qwertyuio'},
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
