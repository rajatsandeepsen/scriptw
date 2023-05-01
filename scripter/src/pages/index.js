import Head from 'next/head'
import { Inter } from 'next/font/google'
import Codespace from '@/components/codemirror'
import SharedDom from '@/components/statemanage'
import { useState,useEffect } from 'react'




export default function Home() {
  const [array, setArray] = useState(null)

  useEffect(() => {
    fetch('/api/code')
    .then(res => res.json())
    .then(data => setArray(data.array))
  }, [])
  

  return (
    <>
      <Head>
        <title>Scripter</title>
        <meta name="description" content="I hate Python, so build a jupyter notebook for Javascript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-vh-100 pb-5 text-white'>
        <header className='container d-flex flex-column align-items-start'>
          <h1><i className="bi bi-code"/></h1>
          <h1>Scripter</h1>
          <p className='lead'>I hate Python, so build a jupyter notebook for Javascript</p>
        </header>
        <div className='container d-flex flex-column gap-5'>
          
          <SharedDom />
          {
            array ?
                array.map((e)=>( <Codespace data={e} /> ))
                : <div class="spinner-border text-white m-auto" role="status"><span class="sr-only"></span></div>
          }
      
        </div>
      </main>
    </>
  )
}
