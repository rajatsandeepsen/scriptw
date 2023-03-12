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
		if (string.indexOf(old) == -1)
			print.log(eval("(async () => {" + newText + "})()"))

		else eval("(async () => {" + newText + "})()")
		
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
	text: async ()=>{
		await new Promise(r => setTimeout(r, 10000));
		eval("111110")
	}
}


async function input(string) {

	let id = string.replace(/ /g,'')

	const inputForm = `<form id=${id}><input placeholder=${string} type="text" name="data"></form>`
	$('#preview').append(inputForm)
	
	return await addInputDesk(id, "data")
}	


function addInputDesk(id, string){
	return new Promise ((resolve, reject)=>{
		let element = document.getElementById(id)

		element.addEventListener("submit",(e)=>{
			e.preventDefault()

			console.log("got the value")

			resolve(e.target.data.value)
	
		}, {once : true})
	})
}