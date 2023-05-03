import Codespace from '@/components/codemirror'
import { useEffect, useImperativeHandle,forwardRef, useState } from 'react'
import useSwr from 'swr'
import styles from '@/styles/Home.module.scss'
import WebBuilder from '@/components/WebBuilder'
import { v4 as uuidv4 } from 'uuid';


const fetcher = (url) => fetch(url).then((res) => res.json())
const CodeSpaceContainer = forwardRef((props, ref) => {
    const fileName = props.fileName
    const {data: code, error: codeError, isLoading: codeLoading} = useSwr(`api/code/${fileName}`, fetcher)
    const [cells, setCells] = useState([])

    
    useImperativeHandle(ref, () => ({
        deleteAllCell: () => setCells([])
    }))

    useEffect(() => {
        if (code) setCells(() => code)
    }, [code]);

    if (codeError) return <p>Failed to Load</p>
    if (codeLoading) return <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
    


    function newCell(type){
      let x = { init: '// let start coding', output: '', cellID: uuidv4()}
    
      if (type === 'cell')  x.type = 'cell'
      else if (type === 'web'){
        x.type = 'web'
        x.HTML = `<!-- let start building websites -->`
        x.CSS = `/* don't forget to change color */`
      } 
      
      setCells((cells) => [...cells, x])
    }


    const deleteCell = (index) => setCells(cells.filter((value, arrIndex) => index !== arrIndex))
    const  clearCell = (index) => setCells((cells) => cells.map((cell, arrIndex) => index === arrIndex ? {output:' ', init: ' '} : cell ))


    const PageButtons = ()=>{
      return (
        <ul className='d-flex gap-3 flex-wrap'>
          <button onClick={()=> newCell('cell')} className={styles.Button}>
            Add Cell <i className="bi bi-plus-square-fill"></i>
          </button>
          <button  disabled className={styles.Button}>
            Markdown <i className="bi bi-hash"></i>
          </button>
          <button onClick={()=> newCell('web')}  className={styles.Button}>
            Web Builder <i className="bi bi-filetype-html"></i>
          </button>
        </ul>
      )
    }
    
      if (cells.length === 0){
      return (
          <>
            <span className='d-flex flex-column align-items-center'>
                <p className='text-white-50'>Create new cell to start coding</p>
                <i className="bi bi-arrow-down text-white-50"/>
            </span>
            <PageButtons />
          </>
      )}

    function AllCodeSpace(){
      return cells.map((eachCell, i)=> {
        switch (eachCell.type) {
          case 'web': return <WebBuilder key={i} index={i} data={eachCell} /> 
          case 'cell': return <Codespace key={i} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell}} />

          default: return <p>Wrong Cell Type</p>
        }
      })
    }

    return (
      <>
        <AllCodeSpace />
        <PageButtons />
      </>
    )

})
 
export default CodeSpaceContainer;