import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json as jsonFunction }  from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react'



export default function SharedDom({file, func, userEmail}) {
  const {id, json, edit: editable} = file
  const {deleteAllCell,updateTheFile} = func

  const [codes, setCodes] = useState("{}")
  const [reableOnly, setReable] = useState(!editable)

  function updateCode(){
    updateTheFile()
    .then(data => console.log(data))

    
    if (codes !== JSON.stringify(json, undefined, 4)) {

      let bodyJson = ''
      try { bodyJson = JSON.parse(codes) }
      catch(e) {console.log(e, codes); return;}


      fetch(`/api/create/${userEmail ?? 'no-user'}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJson),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }

  function print(){
    let container = document.querySelectorAll('.container')

    container.forEach(e => {
      e.classList.replace('container', 'printLayout')
    })

    window.print()

    container.forEach(e => {
      e.classList.replace('printLayout', 'container')
    })
  }

  function clearJSON(){
    let text = "Are you sure you want to clear all the JSON?"
    if (confirm(text)) setCodes("{}")
  }

  useEffect(() => {
    let value = JSON.stringify(json || {}, undefined, 4)
    setCodes(value)

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode == 83 && editable){
        e.preventDefault()
        updateCode()
      }
      else if (e.ctrlKey && e.keyCode == 80){
        e.preventDefault()
        console.log('print')
        print()
      }
    })

  }, []);

  return (
        <section className='container d-flex flex-column position-relative w-100 gap-3'>
        <div className={styles.domStyle}>
            <ul className='cellButtons'>
                <div className='btn-group'>
                  <button disabled={!editable} onClick={updateCode} title='Ctrl + S' className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>Save <i className="bi bi-cloud-fill"/></button>
                  <button disabled={true} title='Ctrl + F' className={`${styles.Button} rounded-0 rounded-end`}>Fork <i className="bi bi-option"/></button>
                </div>
                <div className='btn-group'>
                  <button disabled={true} onClick={deleteAllCell} title='bug fix' className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>Delete All Cells <i className="bi bi-trash-fill"/></button>
                  <button disabled={!editable} onClick={clearJSON} title='' className={`${styles.Button} rounded-0 rounded-end`}>Clear JSON <i className="bi bi-eraser-fill"/></button>
                </div>
            </ul>
          </div>
          <div className={`${styles.codespace} printCell`} data-running={'▲' ||'△'}>
           <CodeMirror id='shared'
            readOnly={reableOnly}
            value={codes === 'null' ? '' : codes}
            height='200px'
            theme={githubDark}
            extensions={[jsonFunction()]}
            onChange={(value) => setCodes(value)}
            />
          </div>
          <div className={styles.domStyle}>
            <div className='btn-group cellButtons'>
              <button title='Ctrl + P' onClick={print} className={`${styles.Button} rounded-0 border-end-0 rounded-start`}>
                Print <i className="bi bi-file-earmark"/>
              </button>

              <button disabled={!editable} onClick={() => setReable((reableOnly)=> !reableOnly)} className={`${styles.Button} rounded-0 rounded-end`}>
              JSON { !reableOnly ? <i className="bi bi-unlock-fill "/> : <i className="bi bi-lock-fill"/> }
              </button>

              
            </div>
          </div>
        </section>
  )
}


// let domData = document.querySelectorAll('[data-language=json]')[0].innerText
// console.log(JSON.stringify(JSON.parse(domData).hi))