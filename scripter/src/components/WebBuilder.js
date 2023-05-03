import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState,useEffect } from 'react';
import { consoleTemplate, inputTemplate, sharedJsonDom } from '@/functions/input';

import { v4 as uuidv4 } from 'uuid';

const WebBuilder = ({index, data, func}) => {
    const {init, output, HTML, CSS, cellID} = data
    
    const [mobileView, viewSet ] = useState(true)
    const [codeView, codeViewSet ] = useState(true)


    const [htmlCode, setHtmlCode] = useState(HTML)
    const [cssCode, setCssCode] = useState(CSS)
    const [jsCode, setJsCode] = useState(init)
    const [finalCode, setFinalCode] = useState(output)

    const id = cellID
    
    useEffect(() => {
        runCode()
    }, [htmlCode, cssCode]);

    function runCode(){
        let preScript = `<script> ${consoleTemplate(id) + sharedJsonDom()}<\/script>`
        let style = `<style>${cssCode}</style>`
        let script = `<script type='module'>
        try { ${jsCode}
         }
        catch (err) { console.error(err) }
        </script>`
        
        let runable = preScript + htmlCode + style + script
        setFinalCode(runable)
    }
    return ( 
        <section className='d-flex flex-column gap-3'>
            <div className={`${styles.WebBuilder} ${mobileView ? styles.MobileView : styles.DesktopView}`}>


                <iframe id={id} srcDoc={finalCode} src="" frameBorder={0}></iframe>
                <main className={codeView ? 'd-flex' : 'd-none'}>
                    
                        <li>
                            <CodeMirror theme={githubDark} extensions={[html()]}
                                value={htmlCode} width='100%' onChange={(value)=> setHtmlCode(value)}/>
                        </li>
                        <li>
                            <CodeMirror theme={githubDark} extensions={[css()]}
                                value={cssCode} width='100%' onChange={(value)=> setCssCode(value)}/>
                        </li>
                        <li>
                            <CodeMirror theme={githubDark} 
                                extensions={[javascript()]}
                                value={jsCode} width='100%' onChange={(value)=> setJsCode(value)}/>
                        </li>

                    
                </main>
            </div>
            <ul className='container ms-0 px-0 d-flex gap-3 flex-wrap w-100 align-items-start'>
                    <button onClick={() => viewSet((mobileView)=> !mobileView)} className={styles.Button}>
                        View <i className="bi bi-grid-1x2-fill"/>
                    </button>
                    <button onClick={() => codeViewSet((codeView)=> !codeView)} className={styles.Button}>
                        Hide <i className="bi bi-code-slash"/>
                    </button>
                    <button onClick={()=>runCode()} className={styles.Button}>
                        Run <i className="bi bi-bootstrap-reboot"/>
                    </button>
                    <div className={`${styles.Button} d-flex gap-2 align-items-start flex-grow-1`}>
                        <i className="bi bi-terminal d-flex fs-4 ms-0" />
                        <code className='flex-grow-1 d-flex flex-column align-items-start' id={id + 'result'}>
                        </code>
                    </div>
                </ul>
        </section>
     );
}
 
export default WebBuilder;