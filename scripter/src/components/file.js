import SharedDom from '@/components/statemanage'
import CodeSpaceContainer from './codespace'
import useSwr from 'swr'
import { useRef } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ScripterFile() {
  const codeSpaceCell = useRef()

  const {data: file, error: fileError, isLoading: fileLoading} = useSwr(`api/header/file1`, fetcher)

    function deleteAllCell(){
      let text = 'Are you sure you want to delete all cell?'
      if (confirm(text)) codeSpaceCell.current.deleteAllCell()
    }

    if (fileError) return <p>Failed to Load</p>
    if (fileLoading) return <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
    if (file === null) return <p>404 File not Found</p>



    return ( 
        <>
        <header className='container d-flex flex-column align-items-start w-100'>
          <img src="/scripter.svg" width={60} height={60} alt="scripter logo" />
          <h1>{file.fileTitle}</h1>
          <div className='text-white-50' dangerouslySetInnerHTML={{__html:file.fileDescription}}></div>
        </header>
        <SharedDom key={file.fileName} file={file} func={deleteAllCell} />
        <CodeSpaceContainer ref={codeSpaceCell} fileName={file.fileName} />
        </>
    )
}