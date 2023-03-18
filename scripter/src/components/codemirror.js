import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from '@uiw/codemirror-theme-github';
import { useEffect, useState, useRef } from 'react'

export default function Codespace({init, name, output}) {
    const [codes, setCodes] = useState(init)
    const compute = useRef()
    const id = name


    compute.current = () => {
        console.log(codes)

        try { new Function(newText)() }
        catch (e){ print.error(e) }
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
          <div className='w-100 flex-grow-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum omnis, reiciendis distinctio delectus vitae inventore voluptate doloribus quis adipisci beatae quam, atque autem praesentium ipsa dolorem amet, velit qui at mollitia! Maiores mollitia optio labore aliquid sapiente debitis hic maxime deserunt fugit, ad assumenda id. Hic eveniet fugiat possimus nulla!
          </div>
        </section>
  )
}
