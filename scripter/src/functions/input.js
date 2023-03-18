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
