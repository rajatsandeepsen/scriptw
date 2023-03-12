# scripter
i hate python, so i build a jupyter notebook for javascript


https://stackoverflow.com/questions/1340872/how-to-get-javascript-caller-function-line-number-and-caller-source-url/37081135#37081135

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval

https://github.com/WebDevSimplified/React-CodePen-Clone/tree/master


```
var regex = /\((.*?)\)/;
    let x =1
	var strToMatch = `console.log(x + 1)`
	var matched = regex.exec(strToMatch);
	console.log(eval(matched[1]))
	eval(strToMatch)
```


```
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}
```

```

	
	// js = js.replace("console.log", "alert");

	// var regex = /\((.*?)\)/;
	// var strToMatch = "This is a test string (more or less)";
	// var matched = regex.exec(strToMatch);
	// console.log(matched[1]);

	// var content = template(jsEditor.value);
```