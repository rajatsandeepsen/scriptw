import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useRef } from 'react'
import { consoleTemplate, inputTemplate, sharedJsonDom, loadAndRun } from '@/functions/input';

export default function Codespace({index, data, func}) {
    const {init, output, cellID} = data
    const {deleteFunc, clearFunc, onChageEachCell } = func


    const [codes, setCodes] = useState(init)
    const [result, setResult ] = useState(output)
    const [isRunning, setRunning] = useState(false)
    
    
    const compute = useRef()
    const noOfTimes = useRef(0)
    const id = cellID

    compute.current = () => {    
      setRunning(true)
      noOfTimes.current += 1
      let runable = consoleTemplate(id) + inputTemplate() + sharedJsonDom() + loadAndRun() + codes
      console.log(runable)
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
        <section className='container d-flex flex-column align-items-center gap-3'>
          <div id={id} onKeyDown={callRefCompute} 
               className={styles.codespace} 
               data-running={isRunning ? '✱' : noOfTimes.current} 
               tabIndex="0">

            <CodeMirror
            value={codes}
            min-height='200px'
            theme={githubDark}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCodes(value)}/>

            <ul>
                
                <button title='del' onClick={()=> deleteFunc(index)} className={styles.Button}>
                  Cell <i className="bi bi-trash-fill"/>
                </button>
                <button title='ctrl + backspace' onClick={()=> clearFunc(index)} className={styles.Button}>
                  Clear <i className="bi bi-eraser-fill"/>
                </button>
                <button title='ctrl + S' onClick={()=> onChageEachCell(id, {init: codes, output:result})} className={styles.Button}>
                  Save <i className="bi bi-save2"/>
                </button>
                
                <button disabled={isRunning} title='Shift + Enter' onClick={compute.current} className={`${styles.Button} ${"runButton"}`}>
                  { isRunning ? 
                                <span className='d-flex gap-1 align-items-center'>Executing <i className='spinner-border spinner-border-sm'></i></span> 
                              : <span className='d-flex gap-1 align-items-center'>Run <i className="bi bi-gear-fill"/></span> }
                </button>
            </ul>
          </div>
          <code id={id + 'result'} className={styles.results} dangerouslySetInnerHTML={{__html : result === ''? '' : result}} />
        </section>
  )
}
