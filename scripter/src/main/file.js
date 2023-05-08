import SharedDom from '@/components/statemanage'
import CodeSpaceContainer from '@/components/codespace'
import useSwr from 'swr'
import { useRef } from 'react'
import { AskGPT } from '@/components/assistance'
import { fetcher, swrOptions } from '@/functions/fetcher'


export default function ScripterFile({routes}) {  
  const codeSpaceCell = useRef()
  
  const {data: file, error: fileError, isLoading: fileLoading} = useSwr(`../api/data/${routes}`, fetcher, swrOptions)

    function deleteAllCell(){
      let text = 'Are you sure you want to delete all cell?'
      if (confirm(text)) codeSpaceCell.current.deleteAllCell()
    }

    if (fileError) return <p>Failed to Load</p>
    if (fileLoading) return <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
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



    return ( 
      <section className='d-flex my-5 flex-column gap-5 align-items-center'>
        <header className='container d-flex flex-column align-items-start w-100'>
          <img src="/scripter.svg" width={60} height={60} alt="scripter logo" />
          <h1>{file.title}</h1>
          <div className='text-white-50'>
            {file.description}
          </div>
        </header>
        <SharedDom key={file.id} file={file.json} func={deleteAllCell} />
        {/*<AskGPT />*/}
        <CodeSpaceContainer ref={codeSpaceCell} fileName={file.name} />
      </section>
    )
}