import Head from 'next/head'
import ScripterFile from '@/main/file'
import Profile from '@/main/profile';
import { useRouter } from 'next/router';
import useSwr from 'swr'
import { fetcher, swrOptions } from '@/functions/fetcher'
import Custom404 from './404';

export default function Home() { 
  const router = useRouter()
  const path = router.query.routes || []
  // console.log(path)
  
  function GetRouteResult(){
    switch (path?.length) {
      case 1: return <Profile userName={ path[0] }/>
      case 2: return <ScripterFile routes={ path.join('/') } />
      
      default: return <Custom404 />
    }
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/scripter.svg" />
        <title>{path.join('/')}</title>
      </Head>
      <main className='text-white'>
        <GetRouteResult />
      </main>
    </>
  )
}
