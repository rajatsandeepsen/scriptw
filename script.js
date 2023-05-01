var runner = document.getElementById("runner");
var scripter = document.getElementById("scripter");

const template = (input) => `<p>${input}</p>`
const errPlate = (input) => `<p style="color: red;">▸ ${input}</p>`

function findConsole(string){
	let word ="print"
	let old = "console"

	newText = string.replace(/console/g,word)
	print.clear()
	try {
		// if (string.indexOf(old) == -1)
		
			new Function(newText)()

		// else Function(newText)


		// else eval("(async () => {" + newText + "})()")
		
	}
	catch (e){ print.error(e) }
}


scripter.addEventListener("keyup" ,(e)=>{
	e.target.style.height = "auto"
	let h = e.target.scrollHeight
	e.target.style.height = `${h}px`

})


function KeyPress(e) {
	if (e.keyCode == 13 && e.shiftKey ){
		e.preventDefault()
		findConsole(scripter.value)
	}
	
}

scripter.addEventListener("keydown", KeyPress)




const print = {
	clear: ()=>{
		$('#preview').html('')
	},

	log: (...arguments) => {
		$('#preview').append(template(arguments.join(" ")))
	},

	assert: (fact, ...arguments) => {
		if (!fact) $('#preview').append(errPlate(arguments.join(" ")))
	},

	error: (...arguments) => {
		$('#preview').append(errPlate(arguments.join(" ")))
	},
	text: ()=>{
		return ("qwertyuiop")
	}
}


async function input(string) {
	let id = string.replace(/ /g,'')

	const inputForm = `<form id="${id}"><input placeholder="${string}" type="text" name="data"></form>`
	$('#preview').append(inputForm)

	return new Promise ((resolve, reject)=>{
		let element = document.getElementById(id)

		element.addEventListener("submit",(e)=>{
			e.preventDefault()
			
			e.target.data.placeholder = e.target.data.value
			e.target.data.disabled = "disabled"
			resolve(e.target.data.value)
		}, {once : true})
	})

}	

// function addInputDesk(id){
// 	return new Promise ((resolve, reject)=>{
// 		let element = document.getElementById(id)

// 		element.addEventListener("submit",(e)=>{
// 			e.preventDefault()

// 			console.log("got the value")
// 			resolve(e.target.data.value)
	
// 		}, {once : true})
// 	})
// }

// eval("input('Enter your name')")