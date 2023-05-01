// export async function input(string) {
// 	let id = string.replace(/ /g,'')

// 	const inputForm = `<form id="${id}"><input placeholder="${string}" type="text" name="data"></form>`
// 	$('#preview').append(inputForm)

// 	return new Promise ((resolve, reject)=>{
// 		let element = document.getElementById(id)

// 		element.addEventListener("submit",(e)=>{
// 			e.preventDefault()

// 			console.log("got the value")
// 			resolve(e.target.data.value)
	
// 		}, {once : true})
// 	})

// }

export function consoleTemplate(id){
	return `const doc = "${id  + 'result'}";\n`+
		"const console = { clear: ()=> document.getElementById(doc).innerHTML = '',\n" +
		"log: (...arg) => document.getElementById(doc).innerHTML += `<span class='console'>${arg.join(' ')}</span>`,\n" +
		"assert: (fact, ...arg) => !fact ? document.getElementById(doc).innerHTML += `<span class='err'>{arg.join(' ')}</span>` : fact ,\n" +
		"add: (...arg) => {let temp = document.createElement('span')\n" +
			"temp.setAttribute('class', 'console')\n" +
			"temp.innerHTML = `${arg.join(' ')}`\n"+
			"document.getElementById(doc).appendChild(temp)},\n"+
		"error: (...arg) => document.getElementById(doc).innerHTML += `<span class='err'>${arg.join(' ')}</span>` , };\n"
	}

export function inputTemplate(){
		return `
		function input(string) { let id = string.replace(/ /g,'')\n` +
		"const inputForm = `<form class='codeinput' id='${id}'><input placeholder='${string}'  type='text' name='data'></form>`\n"
		+`console.add(inputForm)
		return new Promise ((resolve, reject)=>{
			document.getElementById(id).addEventListener("submit",(e)=>{ e.preventDefault()
					e.target.data.placeholder += " = " + e.target.data.value
					e.target.data.disabled = "disabled"
					resolve(e.target.data.value)
				}, {once : true})})}\n`
	}
  
export function sharedJsonDom(){
	return `
	const get = () => JSON.parse(document.querySelector('[data-language=json]').innerText)
	const set = (setter, value) => {
		let returner = get()
		returner[setter] = value
		document.querySelector('[data-language=json]').innerText = JSON.stringify(returner, undefined, 4)}
	const setFunc = (setter, func) => set(setter, (func).toString())
	const getFunc = (funcName) => eval("(" + {...get()}[funcName] + ")")\n`
}


// const get = () => {
// 	let temp = document.querySelector('[data-language=json]').innerText
// 	return JSON.parse(temp)
//   }
// `




	// print.current = {
	// 	log: (...e)=> setResult(result + `<span>${e.join(" ")}</span>`),
	// 	clear: ()=>{ setResult(``), document.getElementById(id+'result').innerHTML = ''},
	// 	assert: (fact, ...arg) => { if (!fact) setResult(result + `<span class="err">${arg.join(" ")}</span>`) },
	// 	error: (...arg) => setResult(result + `<span class="err">${arg.join(" ")}</span>`),
	//   }

	// print.current.clear()
// export function consoleTemplate(id){
// 	const oldConsole = console.log
// 	console.log = (...e) => {
// 		document.getElementById(id + 'result').innerHTML += `<span>>&ensp;${e.join(' ')}</span>`
// 		oldConsole(...e)
// 	}
// }