import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Home.module.scss'
import { useState,useEffect } from 'react'
import 'github-markdown-css/github-markdown-dark.css'
import GPTFetched from '@/components/gptFetch'


export function AskGPT(){
        
        const [input, setInput] = useState(null)
        const [doneSearch, setDoneSearch] = useState(false)
        
        function getSearch(e){
            e.preventDefault()

            setInput(e.target.search.value)
            setDoneSearch(true)
        }
        
        return (
            <div className={`container`}>
                <form className={styles.GPTform} onSubmit={getSearch}>
                    <i className="bi bi-robot d-flex" />
                    <input type="text" disabled={doneSearch} name="search" placeholder={input === null ? "Ask ChatGPT" : input }  />
                </form>
                <div className="d-flex">
                    { doneSearch ? <GPTFetched input={input} /> : '' }
                </div>
            </div>
        )
}


