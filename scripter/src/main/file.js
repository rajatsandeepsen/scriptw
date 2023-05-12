import SharedDom from '@/components/statemanage'
import CodeSpaceContainer from '@/components/codespace'
import useSwr from 'swr'
import { useRef } from 'react'
import { AskGPT } from '@/components/assistance'
import Loading from '@/components/loading'
import { fetchCatchError, swrOptions } from '@/functions/fetcher'
import { signIn } from 'next-auth/react'


export default function ScripterFile({routes}) {  
  const codeSpaceCell = useRef()
  
  const {data: file, error: fileError, isLoading: fileLoading} = useSwr(`../api/data/${routes}`, fetchCatchError, swrOptions)

    function deleteAllCell(){
      let text = 'Are you sure you want to delete all cell?'
      if (confirm(text)) codeSpaceCell.current.deleteAllCell()
    }

    function updateTheFile(){
      codeSpaceCell.current.updateTheFile()
    }

    if (fileLoading) return <Loading error={null} />
    if (fileError) return <Loading error={fileError} login={{inside: <>Sign up with <i className="bi bi-github" /></>, func: () => signIn('github') }} />
    
    if (file === null)
        return (
        <section className='d-flex my-5 flex-column gap-5 align-items-center'>
          <header className='container d-flex flex-column align-items-start w-100'>
            <img src="/scripter.svg" width={60} height={60} alt="scripter logo" />
            <h1>404: file not found</h1>
            <div className='text-white-50'>
              maybe create new file ?
            </div>
          </header>
        </section>
        )



        // <img src="/scripter.svg" width={60} height={60} alt="scripter logo" />
    return ( 
      <section className='d-flex my-5 flex-column gap-5 align-items-center'>
        <header className='container d-flex flex-column align-items-start w-100'>
          <div className='d-flex align-items-center gap-2'>
            <h1>{file.title}</h1>
            <span className='badge badge-pill rounded-5 border-light border-opacity-25 border text-white-50'>{file.visibility ? "Public" : "Private"}</span>
          </div>
          <p className='text-white-50 lead'>
            {file.description}
          </p>
        </header>
        <SharedDom key={file.id} file={file.json} func={{'deleteAllCell': deleteAllCell,'updateTheFile': updateTheFile }} />
        {/*<AskGPT />*/}
        <CodeSpaceContainer ref={codeSpaceCell} fileId={file.id} />
      </section>
    )
}