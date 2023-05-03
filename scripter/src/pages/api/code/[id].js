import { v4 as uuidv4 } from 'uuid';

const array = [
    {init: `// same console.log
let x = 10 + 20
    console.log(x)`, output: '', type:'cell', cellID: uuidv4()},



    {init: `// custom asyc input prompt
let array = [10,20,30]

input("Enter Value")
      .then((value) => {
        array.push(value)
        console.log(array)
      })`, output: '', type:'cell', cellID: uuidv4()},



    {init: `let age = 17

try{ if (age < 18) throw new Error('toooo young') }
      
catch(e){ console.error(e) }
finally { console.log("try again?") }
    
// another console methods`, output: '', type:'cell', cellID: uuidv4()},
{init: "let {url} = get() // reading from JSON\n\nlet HTML = `<img src=${url} alt='img loading?' width='100%'>`\n\nconsole.add(HTML)\n// DOM editor", output: '', type:'cell', cellID: uuidv4()},
{init: "// let bring up a whole website\nlet {sus} = get()\n\nlet HTML = `<iframe src=${sus} height='300px'></iframe>`\n\nconsole.add(HTML)", output: '', type:'cell', cellID: uuidv4()},
{init: `// keyboard shortcuts (awai)

// Execute the current cell (Shift + Enter)
// Execute all the cells (Ctrl + Enter)
// Append new cell (Ctrl + N)

// available all VScode shortcuts`, output: '', type:'cell', cellID: uuidv4()},

{init: `let {x, y, z} = get()

console.log(x, y, z)

console.assert(x > 100 , x + y + z)`, output: '', type:'cell', cellID: uuidv4()},

{init: `let data = {
  name : "Appu",
  age  : 18,
  skills : undefined,
}

set('data', data)
// add data to JSON & access them in next block`, output: '', type:'cell', cellID: uuidv4()},


{init: `let {data} = get() // now access here

console.log(JSON.stringify(data))`, output: '', type:'cell', cellID: uuidv4()},

{init: `// store functions & use it on next cell

function findSum(a, b){ return a + b }
const findSquare = (a,b) => a ** b

setFunc("findSum", findSum)
setFunc("findSquare", findSquare)`, output: '', type:'cell', cellID: uuidv4()},
{init: `// read function
let findSum = getFunc("findSum")

let result = findSum(10, 13)
console.log(result)`, output: '', type:'cell', cellID: uuidv4()},
{init: `async function someFunc(){
  await sleep(1000) // in-build thread sleep
  console.log("After thread sleeping")
}

someFunc()`, output: '', type:'cell', cellID: uuidv4()},

{init: `window.addEventListener("DOMContentLoaded",() => {
	const btn = document.querySelector("button");
	var doneTimeout = null,
		resetTimeout = null;

	if (btn) {
		btn.addEventListener("click",function() {
			const runClass = "btn--running";
			const doneClass = "btn--done";
			const submitDuration = 2000;
			const resetDuration = 1500;

			// fake the submission
			this.disabled = true;
			this.classList.add(runClass);

			clearTimeout(doneTimeout);
			clearTimeout(resetTimeout);

			doneTimeout = setTimeout(() => {
				this.classList.remove(runClass);
				this.classList.add(doneClass);
				
				// reset the button
				resetTimeout = setTimeout(() => {
					this.disabled = false;
					this.classList.remove(doneClass);
				}, resetDuration);

			}, 600 + submitDuration);
		});
	}
});`, output: '', type:'web', cellID: uuidv4(), HTML:`<button class="btn" type="button">
<span class="btn__text">Submit</span>
<svg class="btn__progress" 
  viewBox="0 0 48 48" width="48px" height="48px">
  <circle class="btn__progress-track" 
    r="20" cx="24" cy="24" fill="none" 
    stroke="#c7cad1" stroke-width="8" />
  <circle class="btn__progress-fill" 
    r="20" cx="24" cy="24" fill="none" 
    stroke="#000000" stroke-width="8" 
    transform="rotate(-90,24,24)" 
    stroke-dasharray="125.66 125.66" 
    stroke-dashoffset="125.66" />
  <polyline class="btn__progress-check" 
    points="12,24 20,32 36,16" fill="none" 
    stroke="#fff" stroke-width="4" 
    stroke-linecap="round" 
    stroke-linejoin="round" stroke-dasharray="34 34" 
    stroke-dashoffset="34" />
</svg>
</button>`, CSS: `* {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
:root {
	--hue: 223;
	--bg1: hsl(var(--hue),10%,90%);
	--bg2: hsl(var(--hue),10%,80%);
	--fg1: hsl(var(--hue),10%,10%);
	--fg2: hsl(var(--hue),10%,20%);
	--primary1: hsl(var(--hue),90%,55%);
	--primary2: hsl(var(--hue),90%,45%);
	font-size: calc(20px + (40 - 20) * 
                    (100vw - 320px) / (1280 - 320));
}
body, button {
	font: 1em/1.5 Nunito, sans-serif;
}
body {
	background-color: var(--bg1);
	color: var(--fg1);
	height: 100vh;
	display: grid;
	place-items: center;
}

/* Main button styles */
.btn {
	background-color: transparent;
	border-radius: 1.5em;
	display: block;
	position: relative;
	width: 7.5em;
	height: 3em;
	transition: width 0.3s ease-in-out;
}
.btn:not(:disabled):active {
	transform: translateY(0.1em);
}
.btn__text {
	background-color: var(--primary1);
	border-radius: inherit;
	color: hsl(0,0%,100%);
	display: inline-block;
	padding: 0.75em 1.5em;
	transition:
		background-color 0.15s linear,
		color 0.15s 0.3s ease-in-out;
	width: 100%;
}
.btn:not(:disabled):focus .btn__text,
.btn:not(:disabled):hover .btn__text {
	background-color: var(--primary2);
}
.btn__progress {
	overflow: visible;
	position: absolute;
	top: 0;
	left: 0;
	width: 3em;
	height: 3em;
	visibility: hidden;
}
.btn__progress-track {
	r: 12px;
	stroke: var(--bg2);
	stroke-width: 24;
}
.btn__progress-fill {
	stroke: var(--primary1);
	stroke-dashoffset: 125.66;
}
.btn__progress-check {
	stroke: hsl(0,0%,100%);
	stroke-dashoffset: 34;
}

/* Both states */
.btn--running,
.btn--done {
	outline: none;
	pointer-events: none;
	width: 3em;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}
.btn--running .btn__text,
.btn--done .btn__text {
	color: transparent;
	transition:
		background-color 0.3s ease-in-out,
		visibility 0.3s steps(1);
}
.btn--running .btn__progress,
.btn--done .btn__progress {
	visibility: visible;
}

/* Running state */
.btn--running .btn__text {
	background-color: var(--bg2);
	visibility: hidden;
}
.btn--running .btn__progress {
	transition: visibility 0.3s 0.3s steps(1,start);
}
.btn--running .btn__progress-track {
	r: 20px;
	stroke-width: 8;
	transition:
		r 0.3s 0.3s ease-in-out,
		stroke-width 0.3s 0.3s ease-in-out;
}
.btn--running .btn__progress-fill {
	stroke-dashoffset: 0;
	transition: stroke-dashoffset 2s 0.6s linear;
}

/* Done state */
.btn--done .btn__progress-track {
	stroke: var(--primary1);
	transition:
		r 0.3s ease-in-out,
		stroke-width 0.3s ease-in-out;
}
.btn--done .btn__progress-check {
	stroke-dashoffset: 0;
	transition: stroke-dashoffset 0.3s 0.3s ease-out;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
	:root {
		--bg1: hsl(var(--hue),10%,10%);
		--bg2: hsl(var(--hue),10%,20%);
		--fg1: hsl(var(--hue),10%,90%);
		--fg2: hsl(var(--hue),10%,80%);
	}
}`},

  ]



  const codeDB = new Map()
  codeDB.set('file1', array)
  export default function handler(req, res) {
        let request = req.query.id
        let responce = codeDB.get(request)
        
        responce === undefined ? res.status(404).json({message: 'not found'})
                               : res.status(200).json(responce)
  }
  