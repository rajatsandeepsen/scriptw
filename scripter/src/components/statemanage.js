import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react'


export default function SharedDom({file}) {
  const [codes, setCodes] = useState('')

    useEffect(() => {
      let value = JSON.stringify(file.init, undefined, 4)
      setCodes(value)
    }, []);

  return (
        <section className='d-flex flex-column position-relative w-100 gap-3'>
          <div className={styles.codespace}>
           <CodeMirror id='shared'
            value={codes}
            height='200'
            theme={githubDark}
            extensions={[json()]}
            onChange={(value) => setCodes(value)}
            />
          </div>
          <div className={styles.domStyle}>
            json shared DOM <span>{'<'}</span>
          </div>
        </section>
  )
}


// let domData = document.querySelectorAll('[data-language=json]')[0].innerText
// console.log(JSON.stringify(JSON.parse(domData).hi))