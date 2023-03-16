import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { useEffect,useState } from 'react'
import hljs from "highlight.js";
import $ from 'jquery'

const inter = Inter({ subsets: ['latin'] })




export default function Home() {
  
  const [text, textEditor] = useState(``)

  useEffect(()=>{

    hljs.configure({ignoreUnescapedHTML: true})

    let hello = document.getElementById('hello')
    let textarea = document.getElementById('textarea')
    textarea.addEventListener('input',()=>{
      let x = textarea.value
      let y = hljs.highlight(x, {language: 'javascript'}).value
      textEditor(y)
      
    })

    $('#textarea').on('keydown',function(e){
      if (e.key == 'Tab'){
        e.preventDefault()
        let start = $(this).get(0).selectionStart
        let end = $(this).get(0).selectionEnd

        this.value = this.value.substring(0,start) + '\xa0'.repeat(5) + this.value.substring(end)
        this.selectionStart = this.selectionEnd = start + 1
         
      }
    })
    

  },[])

  


  return (
    <>
      <Head>
        <title>Scripter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-vh-100 text-white'>
        <header className='container d-flex flex-column align-items-start'>
          <h1><i className="bi bi-code"/></h1>
          <h1>Untitled</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam impedit maxime ad libero aperiam.</p>
        </header>
        <div className='container d-flex flex-column'>
          <div id='mark' className={styles.Markdown}>
            <pre>
              <code dangerouslySetInnerHTML={{__html: `<br>` + text}}>
                
              </code>
              <code id='hello'></code>
            </pre>
            <textarea name="" id="textarea"></textarea>
          </div>
        

        
        <div className='d-flex w-100 justify-content-center gap-5'>
          <button className={styles.Button}>Code <i className="bi bi-code"/></button>
          <button className={styles.Button}>Markdown <i className="bi bi-pen"/></button>
        </div>
        </div>
      </main>
    </>
  )
}
