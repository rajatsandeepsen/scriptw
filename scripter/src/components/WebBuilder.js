import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useState,useEffect } from 'react';
import { consoleTemplate, sharedJsonDom } from '@/functions/input';
import {isMobile} from 'react-device-detect';

const WebBuilder = ({index, data, func}) => {
    const {deleteFunc, clearFunc, onChageEachCell} = func
    const {init, output, HTML, CSS, cellID} = data
    
    const [mobileView, viewSet ] = useState(true)
    const [codeView, codeViewSet ] = useState(!isMobile)


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
            {isMobile && <p className='text-center lead text-white-50'>use desktop for better experiance</p>}
            <div className={`${styles.WebBuilder} ${mobileView ? styles.MobileView : styles.DesktopView}`}>


                <iframe id={id} srcDoc={finalCode} src="" frameBorder={0}></iframe>
                <main className={codeView ? 'd-flex' : 'd-none'}>
                    
                        <li>
                            <CodeMirror theme={githubDark} extensions={[html()]}
                                value={htmlCode} onChange={(value)=> setHtmlCode(value)}/>
                        </li>
                        <li>
                            <CodeMirror theme={githubDark} extensions={[css()]}
                                value={cssCode} onChange={(value)=> setCssCode(value)}/>
                        </li>
                        <li>
                            <CodeMirror theme={githubDark} 
                                extensions={[javascript()]}
                                value={jsCode} onChange={(value)=> setJsCode(value)}/>
                        </li>

                    
                </main>
            </div>
            <ul className='ms-md-0 px-md-0 d-flex gap-3 flex-wrap w-100 align-items-start'>
                    <button onClick={() => viewSet((mobileView)=> !mobileView)} className={styles.Button}>
                        View <i className="bi bi-grid-1x2-fill"/>
                    </button>
                    <button onClick={() => codeViewSet((codeView)=> !codeView)} className={styles.Button}>
                        Hide <i className="bi bi-code-slash"/>
                    </button>
                    <button onClick={()=>runCode()} className={styles.Button}>
                        Run <i className="bi bi-bootstrap-reboot"/>
                    </button>
                    <button title='del' onClick={()=> deleteFunc(index)} className={styles.Button}>
                        Cell <i className="bi bi-trash-fill"/>
                    </button>
                    <button title='ctrl + backspace' onClick={()=> clearFunc(index)} className={styles.Button}>
                        Clear <i className="bi bi-eraser-fill"/>
                    </button>
                    <button title='ctrl + S' onClick={()=> onChageEachCell(id, {HTML:htmlCode, CSS:cssCode, init:jsCode, output:finalCode} )} className={styles.Button}>
                        Save <i className="bi bi-save2"/>
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