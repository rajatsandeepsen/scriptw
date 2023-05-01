import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { consoleTemplate, inputTemplate, sharedJsonDom } from '@/functions/input';

export default function Codespace({data}) {
    const {init, output} = data
    const [codes, setCodes] = useState(init)
    const [result, setResult ] = useState(output)
    const compute = useRef()
    const id = uuidv4()


    compute.current = () => {    
      let runable = consoleTemplate(id) + inputTemplate() + sharedJsonDom() + codes
      document.getElementById(id + 'result').innerHTML = ''
      try { new Function(runable)() }
      catch (e){ 
        document.getElementById(id + 'result').innerHTML += `<span class='err'>${e}</span>`
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

  return (
        <section className='d-flex flex-column align-items-center w-100 gap-3'>
          <div id={id} onKeyDown={callRefCompute} className={styles.codespace} tabIndex="0">
            <CodeMirror
            value={codes}
            height='200'
            theme={githubDark}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCodes(value)}
            />
            <ul>
                <button onClick={compute.current} className={`${styles.Button} ${styles.rotateLogo} ${"runButton"}`}>Run <i className="bi bi-gear"/></button>
            </ul>
          </div>
          <code id={id + 'result'} className={styles.results} dangerouslySetInnerHTML={{__html : result === ''? '' : result}} />
        </section>
  )
}
