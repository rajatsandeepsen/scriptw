import Head from 'next/head'
import { Inter } from 'next/font/google'
import Codespace from '@/components/codemirror'
import { useState, useEffect, useRef } from 'react'


export default function Home() {
  const [array, setArray] = useState(null)
  const mapper = useRef()

  useEffect(() => {
    fetch('/api/code')
    .then(res => res.json())
    .then(data => {
      setArray(mapper.current(data.array))
    })
  }, [])
  
  mapper.current = (array) => {
    function previous(element,index, arr){
      if (index === 0) return {...element, prev: ''}
      else {
        let string = arr.slice(0,index).map((e)=> e.init ).join("\n")
        return {...arr[index], prev: string}
      } 
    }
  
    let newArr = []
    array.forEach((e, i, arr) => {
      newArr.push(previous(e, i, arr))
    });
  
    return newArr
  }

  
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
          <p>I hate Python, so build a jupyter notebook for Javascript</p>
        </header>
        <div className='container d-flex flex-column gap-5'>
          
        {array ? array.map((e,i)=>( <Codespace data={e} index={i} setArrayMod={setArray} /> )) : <div class="spinner-border text-white m-auto" role="status"><span class="sr-only"></span></div> }
      
        </div>
      </main>
    </>
  )
}
