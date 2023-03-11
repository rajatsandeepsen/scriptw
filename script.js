var htmlEditor = document.getElementById("html-editor");
var cssEditor = document.getElementById("css-editor");
var jsEditor = document.getElementById("js-editor");
var preview = document.getElementById("preview");
var runButton = document.getElementById("run-button");

const template = (input) => `<div style="border: 1px solid #ccc">${input}</div>`


function updatePreview() {
	var html = htmlEditor.value;
	var css = "<style>" + cssEditor.value + "</style>";
	var js = "<script>" + jsEditor.value + "</script>";
	// js = js.replace("console.log", "alert");

	// var regex = /\((.*?)\)/;
	// var strToMatch = "This is a test string (more or less)";
	// var matched = regex.exec(strToMatch);
	// console.log(matched[1]);

	// var content = template(jsEditor.value);
	var content = html + css + js;
	preview.srcdoc = content;
}

runButton.addEventListener("click", function() {
	updatePreview();
});

htmlEditor.addEventListener("input", function() {
	updatePreview();
});

cssEditor.addEventListener("input", function() {
	updatePreview();
});

jsEditor.addEventListener("input", function() {
	updatePreview();
});


// console.stdlog = console.log.bind(console);
// console.logs = [];
// console.log = function(){
//     console.logs.push(Array.from(arguments));
//     console.stdlog.apply(console, arguments);
// 	alert("Hello World")
// }