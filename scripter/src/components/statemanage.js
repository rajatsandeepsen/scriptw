import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react'

function runAll(){
  document.querySelectorAll('.runButton').forEach(e => {
    setTimeout(()=> e.click(), 300)
  })
}

export default function SharedDom({file}) {
  const [codes, setCodes] = useState('')
  const [reableOnly, setReable] = useState(true)

    useEffect(() => {
      let value = JSON.stringify(file.init, undefined, 4)
      setCodes(value)
    }, []);

    
    

  return (
        <section className='d-flex flex-column position-relative w-100 gap-3'>
          <div className={styles.codespace}>
           <CodeMirror id='shared'
           readOnly= {reableOnly}
            value={codes}
            height='200'
            theme={githubDark}
            extensions={[json()]}
            onChange={(value) => setCodes(value)}
            />
          </div>
          <div className={styles.domStyle}>
            <ul>
              <button onClick={runAll} className={styles.Button}>Run All <i className="bi bi-gear"/></button>
              <button onClick={() => setReable((reableOnly)=> !reableOnly)} className={styles.Button}>
              JSON { !reableOnly ? <i className="bi bi-unlock "/> : <i className="bi bi-lock"/> }
              </button>
              {/*<button onClick={runAll} className={styles.Button}>Save <i className="bi bi-cloud"/></button>*/}
            </ul>
          </div>
        </section>
  )
}


// let domData = document.querySelectorAll('[data-language=json]')[0].innerText
// console.log(JSON.stringify(JSON.parse(domData).hi))