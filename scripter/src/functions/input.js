export function consoleTemplate(id){
	return `const doc = "${id  + 'result'}";\n`+
		"const console = { clear: ()=> window.parent.document.getElementById(doc).innerHTML = '',\n" +
		"log: (...arg) => window.parent.document.getElementById(doc).innerHTML += `<span class='console'>${arg.join(' ')}</span>`,\n" +
		"assert: (fact, ...arg) => !fact ? window.parent.document.getElementById(doc).innerHTML += `<span class='err'>${arg.join(' ')}</span>` : fact ,\n" +
		"add: (...arg) => {let temp = window.parent.document.createElement('span')\n" +
			"temp.setAttribute('class', 'console')\n" +
			"temp.innerHTML = `${arg.join(' ')}`\n"+
			"window.parent.document.getElementById(doc).appendChild(temp)},\n"+
		"error: (...arg) => window.parent.document.getElementById(doc).innerHTML += `<span class='err'>${arg.join(' ')}</span>` , };console.clear()\n"
	}

export function inputTemplate(){
		return `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
		async function input(string) { let id = string.replace(/ /g,'')\n` +
		"const inputForm = `<form class='codeinput' id='${id}'><input placeholder='${string}'  type='text' name='data'></form>`\n"
		+`console.add(inputForm)
		await sleep(10)
		return new Promise ((resolve, reject)=>{
			window.parent.document.getElementById(id).addEventListener("submit",(e)=>{ e.preventDefault()
					e.target.data.placeholder += " = " + e.target.data.value
					e.target.data.disabled = "disabled"
					resolve(e.target.data.value)
				}, {once : true})})}\n`
	}
  
export function sharedJsonDom(){
	return `
	const get = () => JSON.parse(window.parent.document.querySelector('[data-language=json]').innerText)
	const set = (setter, value) => {
		let returner = get()
		returner[setter] = value
		window.parent.document.querySelector('[data-language=json]').innerText = JSON.stringify(returner, undefined, 4)}
	const setFunc = (setter, func) => set(setter, (func).toString())
	const getFunc = (funcName) => eval("(" + {...get()}[funcName] + ")")\n`
}



// fetch('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js')
//   .then((response) => response.text())
//   .then((code) => {
//     let ano = `\nconst sum = _.sum([1,2,3,4,5]); console.log(sum)`
//     eval(code + ano);
//     // console.log(code)
//     // Now you can use functions defined in the fetched library
//   })
//   .catch((err) => {
//     console.error('Failed to fetch library code', err);
//   });





// fetch('https://unpkg.com/brain.js@2.0.0-beta.23/dist/browser.js')
//   .then((response) => response.text())
//   .then((code) => {
//     let ano = `\nconst network = new brain.NeuralNetwork();
// network.train([
//   {input:[0,0], output:{zero:1}},
//   {input:[0,1], output:{one:1}},
//   {input:[1,0], output:{one:1}},
//   {input:[1,1], output:{zero:1}},
// ]);
// let result = network.run([1,0]); console.add(result); console.log(JSON.stringify(result))`
//     eval(code + ano);
//     // Now you can use functions defined in the fetched library
//   })
//   .catch((err) => {
//     console.error('Failed to fetch library code', err);
//   });

export function loadAndRun(){
return `const importPackage = (url, func) => {
			const functionAsString = func.toString();
			const functionCode = functionAsString.substring(functionAsString.indexOf('{') + 1, functionAsString.lastIndexOf('}')).trim();
			fetch(url)
				.then((response) => response.text())
				.then((code) => { eval(code +'\\n'+ functionCode) })
				.catch((err) => { console.error(err) })
			}
			`
}

// class importPackage {

// 	constructor(url){
// 	  this.url = url
// 	  fetch(url)
// 	  	.then((response) => response.text())
// 	  	.then((package) => this.package = package)
// 	}
// 	run(func){
// 		this.func = func.toString()
// 		let a = functionAsString.indexOf('{') + 1
// 		let b = functionAsString.lastIndexOf('}')
// 		this.functionality = this.func.substring(a, b).trim();
// 	}
// 	gloabalize(){
// 		if (prompt('Do you want to globalize this package?'))
// 			document.appendChild(`<script>${this.package}</script>`)
// 	}
//   }
  

// const network = new brain.NeuralNetwork();
// network.train([
//   {input:[0,0], output:{zero:1}},
//   {input:[0,1], output:{one:1}},
//   {input:[1,0], output:{one:1}},
//   {input:[1,1], output:{zero:1}},
// ]);
// let result = network.run([1,0]);
// console.log(JSON.stringify(result))


// let {braindotjs} = get()
// loadAndRun(braindotjs,()=>{
  
// const network = new brain.NeuralNetwork();
// network.train([
//   {input:[0,0], output:{zero:1}},
//   {input:[0,1], output:{one:1}},
//   {input:[1,0], output:{one:1}},
//   {input:[1,1], output:{zero:1}},
// ]);
// let result = network.run([1,0]);
// console.log(JSON.stringify(result))
// })














// class importPackage {
// 	doneFetch= false
// 	  constructor (url){
// 		this.url = url
// 		fetch(url)
// 			.then((response) => response.text())
// 			.then((packageCode) => {
// 			this.packageCode = packageCode
// 			this.doneFetch = true
// 		  })
// 		  .catch((err) => { console.error(err) })
		  
// 	  }
// 	  function(func){
// 		  this.func = func.toString()
// 		  let a = this.func.indexOf('{') + 1
// 		  let b = this.func.lastIndexOf('}')
// 		  this.functionality = this.func.substring(a, b).trim();
// 	  }
// 	  globalize(){
// 		  if (confirm('Do you want to globalize this packageCode?'))
// 			  document.body.appendChild(`<script>${this.packageCode}</script>`)
// 	  }
// 	run(){
// 	  if (this.doneFetch)
// 		  eval(this.packageCode + '\n\n' + this.functionality)
// 	  else throw Error("hi")
// 	}
	
//   }
  
//   let {braindotjs} = get()
//   let x = new importPackage(braindotjs)
  
//   x.function(()=>{
// 	const network = new brain.NeuralNetwork();
// 	network.train([
// 	  {input:[0,0], output:{zero:1}},
// 	  {input:[0,1], output:{one:1}},
// 	  {input:[1,0], output:{one:1}},
// 	  {input:[1,1], output:{zero:1}},
// 	]);
// 	let result = network.run([1,0]);
// 	let resultText = JSON.stringify(result)
// 	console.log(resultText)
// 	set("result", resultText )
//   })
  
//   console.log(x.packageCode)
//   x.run()