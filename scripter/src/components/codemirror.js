import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useEffect, useState, useRef } from 'react'
import { consoleTemplate } from '@/functions/input';

export default function Codespace({data}) {
    const {init, name, output} = data
    const [codes, setCodes] = useState(init)
    const [result, setResult ] = useState(output)
    const compute = useRef()
    // const print = useRef()
    const id = name


    compute.current = () => {    
      let runable = consoleTemplate(id) + codes.replace(/console/g,'print')

      try { new Function(runable)() }
      catch (e){ 
        document.getElementById(id + 'result').innerHTML += `<span class='err'>>&ensp;${e}</span>`
      }
      finally { 
        setResult(document.getElementById(id + 'result').innerHTML)
      }
    }

    function callRefCompute(e){
        if (e.keyCode == 13 && e.shiftKey ){
            e.preventDefault()
            compute.current();
        }
    }
useEffect(()=>{
  console.log(result)
},[result])
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
          <code id={id + 'result'} className='w-100 flex-grow-1 d-flex flex-column' dangerouslySetInnerHTML={{__html : result === ''? '' : result}}>
          </code>
        </section>
  )
}
