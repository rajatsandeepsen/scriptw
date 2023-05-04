import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import { markdown } from '@codemirror/lang-markdown'
import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
// import '../node_modules/github-markdown-css/github-markdown.css'
import 'github-markdown-css/github-markdown.css'

function Markdown({index,data}){
    const {init, cellID} = data
    
    const [input, setInput] = useState(init)
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div id={cellID} onDoubleClick={() => setIsEditing(!isEditing)} className={`${styles.Markdown} container`}>
        
            {
                isEditing ? <CodeMirror value={input} min-height='200px' theme={githubDark} 
                                     extensions={[markdown()]} onChange={(value) => setInput(value)}/>
                          : <ReactMarkdown className={`markdown-body p-5 bg-black`} remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>    
            }
        </div>
    )
}

export default Markdown