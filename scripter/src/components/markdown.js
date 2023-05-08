import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import { markdown } from '@codemirror/lang-markdown'
import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import 'github-markdown-css/github-markdown-dark.css'

function Markdown({index,data, func}){
    const {init, cellID} = data
    const {deleteFunc, clearFunc, onChageEachCell} = func
    
    const [input, setInput] = useState(init ?? 'markdown empty')
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div id={cellID} onDoubleClick={() => setIsEditing(!isEditing)} className={`${styles.Markdown} container d-flex flex-column gap-3`}>
        
            {
                isEditing ? <CodeMirror value={input} theme={githubDark} 
                                     extensions={[markdown()]} onChange={(value) => setInput(value)}/>
                          : <ReactMarkdown className={`markdown-body p-3 p-md-5 bg-black`} remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>    
            }
            <ul className='d-flex w-100 gap-2'>
                <button title='del' onClick={()=> deleteFunc(index)} className={styles.Button}>
                    Cell <i className="bi bi-trash-fill"/>
                </button>
                <button title='ctrl + backspace' onClick={()=> clearFunc(index)} className={styles.Button}>
                    Clear <i className="bi bi-eraser-fill"/>
                </button>
                <button title='ctrl + S' onClick={()=> onChageEachCell(id, {init:input})} className={styles.Button}>
                    Save <i className="bi bi-save2"/>
                </button>
            </ul>
        </div>
    )
}

export default Markdown