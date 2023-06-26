import Head from 'next/head'
import ScripterFile from '@/main/file'
import styles from '@/styles/Home.module.scss'
import Router from 'next/router'
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image'

export default function Home() {
  const { data: session , status} = useSession()

  
  if (status === 'authenticated' && session) {
    Router.push(`/${session.user.email.split('@')[0]}`)
  }


  else return (
    <>
      <Head>
        <title>ScriptW</title>
        <meta property="og:image" content="https://scriptw.vercel.app/scripter.svg" />
        <meta property="og:title" content="Notebook for Javascript" />
        <meta property="og:description" content="In-Browser Jupyter Notebook Alternative for JS" />
        <meta property="og:url" content="https://scriptw.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ScriptW" />
        <meta property="og:locale" content="en_US" />

        <meta name="keywords" content="Rajat Sandeep, Rajat, Rajat Sandeep Sen, jupyter, notebook, javascript, js" />
        <meta name="author" content="Rajat Sandeep" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />

        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="scriptw.vercel.app"/>
        <meta property="twitter:url" content="https://scriptw.vercel.app/"/>
        <meta name="twitter:title" content="ScriptW | In-Browser Jupyter Notebook Alternative for JS"/>
        <meta name="twitter:description" content="Jupyter Notebook for Javascript"/>
        <meta name="twitter:image" content="https://scriptw.vercel.app/scripter.svg"/>

        <meta name="description" content="In-Browser Jupyter Notebook Alternative for JS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/scripter.svg" />
      </Head>
      <main className='text-white'>
        <section className='container d-flex my-5 flex-column text-center align-items-center justify-content-center'>
        <h1 className='display-6'>Welcome to <span>ScriptW</span></h1>
        <p className='lead'>In-Browser Jupyter Notebook Alternative for Javascript</p>
        
        <div className={styles.mockup}>
          <Image src={'/mockup.png'}  width={1200} height={600} loading='eager'alt='scriptw'/>
        </div>
        
        <div className="d-flex flex-column gap-3 mt-5 align-items-center">
          <h4>Create new Account / Login In</h4>
            <div className="d-flex gap-3">
              <button onClick={() => signIn('github')} className={styles.Button}>Sign up with <i className="bi bi-github" /></button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
