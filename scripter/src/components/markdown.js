import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Home.module.scss'
import { useRef, useState } from 'react'
import { markdown } from '@codemirror/lang-markdown'
import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import 'github-markdown-css/github-markdown-dark.css'

function Markdown({index,data, func}){
    const computeSave = useRef()
    const {init, id} = data
    const {deleteFunc, clearFunc, onChageEachCell} = func

    computeSave.current = () => {
        setIsEditing(!isEditing)
        onChageEachCell(id, {init:input})
    }

    function handleKeys(e){
        if (e.keyCode == 13 && e.shiftKey) {
            e.preventDefault();
            computeSave.current();
          }
    }
    const [input, setInput] = useState(init ?? 'markdown empty')
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div id={id} onKeyDown={handleKeys} onDoubleClick={() => setIsEditing(!isEditing)} className={`${styles.Markdown} container d-flex flex-column gap-3`}>
        
            {
                isEditing ? <CodeMirror value={input} theme={githubDark} 
                                     extensions={[markdown()]} onChange={(value) => setInput(value)}/>
                          : <ReactMarkdown className={`markdown-body p-3 p-md-5 bg-black`} remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>    
            }
            <div className='btn-group'>
                <button title='del' onClick={()=> deleteFunc(index)} className={`${styles.Button} rounded-0 rounded-start border-end-0`}>
                    Cell <i className="bi bi-trash-fill"/>
                </button>
                <button title='ctrl + backspace' onClick={()=> clearFunc(index)} className={`${styles.Button} rounded-0 border-end-0`}>
                    Clear <i className="bi bi-eraser-fill"/>
                </button>
                <button title='ctrl + S' onClick={()=> computeSave.current()} className={`${styles.Button} rounded-0 rounded-end`}>
                    Save <i className="bi bi-save2"/>
                </button>
            </div>
        </div>
    )
}

export default Markdown