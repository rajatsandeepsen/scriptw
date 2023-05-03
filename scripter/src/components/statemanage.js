import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react'



export default function SharedDom({file, func}) {
  const [codes, setCodes] = useState('')
  const [reableOnly, setReable] = useState(false)
  const [isAllRun, setAllRun] = useState(false)

  function runAll(){
    setAllRun(true)
    document.querySelectorAll('.runButton').forEach(e => {
      setTimeout(()=> e.click(), 300)
    })
    setTimeout(()=> setAllRun(false), 1000)
  }

  function clearJSON(){
    let text = "Are you sure you want to clear all the JSON?"
    if (confirm(text)) setCodes('')
  }

    useEffect(() => {
      let value = JSON.stringify(file.init, undefined, 4)
      setCodes(value)

      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode == 13){
          e.preventDefault()
          runAll()
        }
      })

    }, []);

  return (
        <section className='container d-flex flex-column position-relative w-100 gap-3'>
          <div className={styles.codespace} data-running={isAllRun ? '△' : '▲'}>
           <CodeMirror id='shared'
           readOnly= {reableOnly}
            value={codes}
            min-height='200px'
            theme={githubDark}
            extensions={[json()]}
            onChange={(value) => setCodes(value)}
            />
          </div>
          <div className={styles.domStyle}>
            <ul>
              <button disabled={isAllRun} title='Ctrl + Enter' onClick={runAll} className={styles.Button}>
              { isAllRun ? 
                          <span className='d-flex gap-1 align-items-center'>Executing All <i className='spinner-border spinner-border-sm'></i></span>
                         : <span className='d-flex gap-1'>Run All <i className="bi bi-play-circle-fill"/></span>}  
              </button>

              <button onClick={() => setReable((reableOnly)=> !reableOnly)} className={styles.Button}>
              JSON { !reableOnly ? <i className="bi bi-unlock-fill "/> : <i className="bi bi-lock-fill"/> }
              </button>

              <button disabled={true} title='Ctrl + S' className={styles.Button}>Save <i className="bi bi-cloud-fill"/></button>
              <button disabled={true} title='Ctrl + F' className={styles.Button}>Fork <i className="bi bi-option"/></button>
              <button onClick={func} title='' className={styles.Button}>Delete All Cells <i className="bi bi-trash-fill"/></button>
              <button onClick={clearJSON} title='' className={styles.Button}>Clear JSON <i className="bi bi-eraser-fill"/></button>
            </ul>
          </div>
        </section>
  )
}


// let domData = document.querySelectorAll('[data-language=json]')[0].innerText
// console.log(JSON.stringify(JSON.parse(domData).hi))