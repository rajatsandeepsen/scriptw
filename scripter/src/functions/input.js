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

export function consoleTemplate(id, index){
	if (index === 0) return `\nlet doc = "${id  + 'result'}";\n` +
		"let console = { clear: ()=> document.getElementById(doc).innerHTML = '',\n" +
		"log: (...arg) => document.getElementById(doc).innerHTML += `<span>>&ensp;${arg.join(' ')}</span>`,\n" +
		"assert: (fact, ...arg) => !fact ? document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` : fact ,\n" +
		"error: (...arg) => document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` , };\n" +
		"console.clear()\n"
	
	else return `\nlet doc = "${id  + 'result'}";\n` +
	"console = { clear: ()=> document.getElementById(doc).innerHTML = '',\n" +
	"log: (...arg) => document.getElementById(doc).innerHTML += `<span>>&ensp;${arg.join(' ')}</span>`,\n" +
	"assert: (fact, ...arg) => !fact ? document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` : fact ,\n" +
	"error: (...arg) => document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` , };\n" +
	"console.clear()\n"
}



// function customConsole(id){
// 	let doc = id  + 'result'
// 	let DGEID = document.getElementById

// 	let console = { clear: ()=> DGEID(doc).innerHTML = '',
// 		id: id + 'result',
// 		log: (...arg) => DGEID(doc).innerHTML += `<span>>&ensp;${arg.join(' ')}</span>`,
// 		assert: (fact, ...arg) => !fact ? DGEID(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` : fact ,
// 		error: (...arg) => DGEID(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>`
// 	}



// 	return JSON.stringify(console)
// }