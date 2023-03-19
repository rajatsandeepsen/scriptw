export async function input(string) {
	let id = string.replace(/ /g,'')

	const inputForm = `<form id="${id}"><input placeholder="${string}" type="text" name="data"></form>`
	$('#preview').append(inputForm)

	return new Promise ((resolve, reject)=>{
		let element = document.getElementById(id)

		element.addEventListener("submit",(e)=>{
			e.preventDefault()

			console.log("got the value")
			resolve(e.target.data.value)
	
		}, {once : true})
	})

}

export function consoleTemplate(id){
	return `const doc = "${id  + 'result'}";\n`+
		"const print = { clear: ()=> document.getElementById(doc).innerHTML = '',\n" +
		"log: (...arg) => document.getElementById(doc).innerHTML += `<span>>&ensp;${arg.join(' ')}</span>`,\n" +
		"assert: (fact, ...arg) => !fact ? document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` : fact ,\n" +
		"error: (...arg) => document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` , };\n" +
		"print.clear()\n" 
	}
  


	
	// print.current = {
	// 	log: (...e)=> setResult(result + `<span>${e.join(" ")}</span>`),
	// 	clear: ()=>{ setResult(``), document.getElementById(id+'result').innerHTML = ''},
	// 	assert: (fact, ...arg) => { if (!fact) setResult(result + `<span class="err">${arg.join(" ")}</span>`) },
	// 	error: (...arg) => setResult(result + `<span class="err">${arg.join(" ")}</span>`),
	//   }

	// print.current.clear()
  