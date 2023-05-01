import Head from 'next/head'
import ScripterFile from '@/components/file'

export default function Home() {  

  return (
    <>
      <Head>
        <title>Scripter</title>
        <meta name="description" content="I hate Python, so build a jupyter notebook for Javascript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-vh-100 text-white'>
        <section className='container d-flex my-5 flex-column gap-5 align-items-center'>
          <ScripterFile/>
        </section>
      </main>
    </>
  )
}
