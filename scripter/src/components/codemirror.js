import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useEffect, useState, useRef } from 'react'

export default function Codespace({data}) {
    const {init, name, output} = data
    const [codes, setCodes] = useState(init)
    const [result, setResult ] = useState(output)
    const compute = useRef()
    const print = useRef()
    const id = name

    print.current = {
      log: (...e)=> setResult(result + `<span>${e.join(" ")}</span>`),
      clear: ()=>{ setResult(``), document.getElementById(id+'result').innerHTML = ''},
      assert: (fact, ...arg) => { if (!fact) setResult(result + `<span class="err">${arg.join(" ")}</span>`) },
      error: (...arg) => setResult(result + `<span class="err">${arg.join(" ")}</span>`),
    }

function consoleTemplate(id){
  return `const doc = "${id  + 'result'}";\n`+
      "const print = { clear: ()=> document.getElementById(doc).innerHTML = '',\n" +
      "log: (...arg) => document.getElementById(doc).innerHTML += `<span>>&ensp;${arg.join(' ')}</span>`,\n" +
      "assert: (fact, ...arg) => !fact ? document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` : fact ,\n" +
      "error: (...arg) => document.getElementById(doc).innerHTML += `<span class='err'>>&ensp;${arg.join(' ')}</span>` , };\n"
  }

    compute.current = () => {
      let word ="print"
      let old = "console"
    
      let runable = consoleTemplate(id) + codes.replace(/console/g,word)
      console.log(runable)
      print.current.clear()

        try { new Function(runable)() }
        catch (e){ console.log(e); eval(runable) }

        // setResult() 
    }

    function callRefCompute(e){
        if (e.keyCode == 13 && e.shiftKey ){
            e.preventDefault()
            compute.current();
        }
    }

  return (
        <section className='d-flex flex-column align-items-center w-100 gap-3'>
          <div id={id} onKeyDown={callRefCompute} className={styles.codespace} tabIndex="0">
            <CodeMirror
            value={codes}
            height='auto'
            theme={githubDark}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCodes(value)}
            />
            <ul>
                <button className={styles.Button}>Code <i className="bi bi-code"/></button>
                <button className={styles.Button}>Markdown <i className="bi bi-pen"/></button>
            </ul>
          </div>
          <div id={id + 'result'} className='w-100 flex-grow-1 d-flex flex-column'>
            {result}
          </div>
        </section>
  )
}
