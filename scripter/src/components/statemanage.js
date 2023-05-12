import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react'



export default function SharedDom({file, func}) {
  const {deleteAllCell,updateTheFile} = func

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
      let value = JSON.stringify(file, undefined, 4)
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
        <div className={styles.domStyle}>
            <ul>
                <div className='btn-group'>
                  <button onClick={updateTheFile} title='Ctrl + S' className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>Save <i className="bi bi-cloud-fill"/></button>
                  <button disabled={true} title='Ctrl + F' className={`${styles.Button} rounded-0 rounded-end`}>Fork <i className="bi bi-option"/></button>
                </div>
                <div className='btn-group'>
                  <button onClick={deleteAllCell} title='' className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>Delete All Cells <i className="bi bi-trash-fill"/></button>
                  <button onClick={clearJSON} title='' className={`${styles.Button} rounded-0 rounded-end`}>Clear JSON <i className="bi bi-eraser-fill"/></button>
                </div>
            </ul>
          </div>
          <div className={styles.codespace} data-running={isAllRun ? '△' : '▲'}>
           <CodeMirror id='shared'
            readOnly={reableOnly}
            value={codes === 'null' ? '' : codes}
            height='200px'
            theme={githubDark}
            extensions={[json()]}
            onChange={(value) => setCodes(value)}
            />
          </div>
          <div className={styles.domStyle}>
            <div className='btn-group'>
              <button disabled={isAllRun} title='Ctrl + Enter' onClick={runAll} className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>
              { isAllRun ? 
                          <span className='d-flex gap-1 align-items-center'>Executing All <i className='spinner-border spinner-border-sm'></i></span>
                         : <span className='d-flex gap-1'>Run All <i className="bi bi-play-circle-fill"/></span>}  
              </button>

              <button onClick={() => setReable((reableOnly)=> !reableOnly)} className={`${styles.Button} rounded-0 rounded-end`}>
              JSON { !reableOnly ? <i className="bi bi-unlock-fill "/> : <i className="bi bi-lock-fill"/> }
              </button>

              
            </div>
          </div>
        </section>
  )
}


// let domData = document.querySelectorAll('[data-language=json]')[0].innerText
// console.log(JSON.stringify(JSON.parse(domData).hi))