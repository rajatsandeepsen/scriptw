import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { consoleTemplate, inputTemplate, sharedJsonDom } from '@/functions/input';

export default function Codespace({index, data, func}) {
    const {init, output} = data
    const {deleteFunc, clearFunc} = func


    const [codes, setCodes] = useState(init)
    const [result, setResult ] = useState(output)
    const [isRunning, setRunning] = useState(false)
    
    
    const compute = useRef()
    const id = uuidv4()

    compute.current = () => {    
      setRunning(true)

      let runable = consoleTemplate(id) + inputTemplate() + sharedJsonDom() + codes
      document.getElementById(id + 'result').innerHTML = ''
      try { new Function(runable)() }
      catch (e){ 
        document.getElementById(id + 'result').innerHTML += `<span class='err'>${e}</span>`
      }
      finally { 
        setResult(document.getElementById(id + 'result').innerHTML)
        setTimeout(()=> setRunning(false), 1000)
        
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
            height='200px'
            theme={githubDark}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCodes(value)}
            />
            <ul>
                {/*<button title='del' onClick={()=> deleteFunc(index)} className={styles.Button}>
                  Cell <i className="bi bi-trash-fill"/>
                </button>
                <button title='ctrl + backspace' onClick={()=> clearFunc(index)} className={styles.Button}>
                  Clear <i className="bi bi-eraser-fill"/>
                </button>*/}
                <button disabled={isRunning} title='Shift + Enter' onClick={compute.current} className={`${styles.Button} ${"runButton"}`}>
                  { isRunning ? 
                                <span className='d-flex gap-1 align-items-center'>Executing <i className='spinner-border spinner-border-sm'></i></span> 
                              : <span className='d-flex gap-1'>Run <i className="bi bi-gear"/></span> }
                </button>
            </ul>
          </div>
          <code id={id + 'result'} className={styles.results} dangerouslySetInnerHTML={{__html : result === ''? '' : result}} />
        </section>
  )
}
