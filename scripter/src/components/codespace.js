import Codespace from '@/components/codemirror'
import { useEffect, useImperativeHandle,forwardRef, useState } from 'react'
import useSwr from 'swr'
import styles from '@/styles/Home.module.scss'
import WebBuilder from '@/components/WebBuilder'
import Markdown from '@/components/markdown'
import { v4 as uuidv4 } from 'uuid';
import { fetcher, swrOptions } from '@/functions/fetcher'


const CodeSpaceContainer = forwardRef((props, ref) => {
    const fileName = props.fileName
    const {data: code, error: codeError, isLoading: codeLoading} = useSwr(`../api/code/${fileName}`, fetcher, swrOptions)
    const [cells, setCells] = useState([])

    
    useImperativeHandle(ref, () => ({
        deleteAllCell: () => setCells([])
    }))

    useEffect(() => {
        if (code) setCells(() => code)
    }, [code]);

    if (codeError) return <p>Failed to Load</p>
    if (codeLoading) return <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
    
    const handleChildStateChange = (cellID, newState) => {
      const index = cells.findIndex(obj => obj.cellID === cellID);
      const newArray = [...cells];
      newArray[index] = { ...newArray[index], ...newState, cellID: cellID };
      setCells(newArray);
    };

    function newCell(type){
      let x = { output: '', cellID: uuidv4()}
    
      if (type === 'cell'){
        x.type = 'cell'
        x.init = '// Let start coding\n// (Shift + Enter) to Execute\n'
      } 
      else if (type === 'markdown') {
        x.type = 'markdown'
        x.init = '### Double click to Edit/Save\n'
      } 
      else if (type === 'web'){
        x.type = 'web'
        x.init = '// Auto Run Enabled\n'
        x.HTML = `<!-- let start building websites -->\n`
        x.CSS = `/* don't forget to change color */\n`
      } 
      if (cells.length === 0  || !Array.isArray(cells)) 
          setCells([x])
      else 
          setCells((cells) => [...cells, x])
    }

    const deleteCell = (index) => setCells(cells.filter((value, arrIndex) => index !== arrIndex))
    const  clearCell = (index) => setCells((cells) => cells.map((cell, arrIndex) => {
          if (index === arrIndex) {
            let fresh = {}
            for (const [key, value] of Object.entries(cell)) { fresh[key] = '' }
            fresh.cellID = cell.cellID
            fresh.type = cell.type
            return fresh
          }
          else return cell
    }))


    const PageButtons = ()=>{
      return (
        <ul className='container d-flex justify-content-center gap-3 flex-wrap'>
          <button onClick={()=> newCell('cell')} className={styles.Button}>
            Add Cell <i className="bi bi-plus-square-fill"></i>
          </button>
          <button onClick={()=> newCell('web')}  className={styles.Button}>
            Web Builder <i className="bi bi-filetype-html"></i>
          </button>
          <button onClick={()=> newCell('markdown')} className={styles.Button}>
            Markdown <i className="bi bi-hash"></i>
          </button>
        </ul>
      )
    }
    
    

    function AllCodeSpace(){


      if (!Array.isArray(cells) || !cells.length){
        return (
              <span className='d-flex flex-column align-items-center'>
                  <p className='text-white-50'>Create new cell to start coding</p>
                  <i className="bi bi-arrow-down text-white-50"/>
              </span>
        )
      }
      
      return cells.map((eachCell, i)=> {
        switch (eachCell.type) {
          // case 'web': return <WebBuilder key={eachCell.cellID} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell, onChageEachCell: handleChildStateChange}} /> 
          case 'cell': return <Codespace key={eachCell.cellID} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell, onChageEachCell: handleChildStateChange}} />
          case 'markdown': return <Markdown key={eachCell.cellID} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell, onChageEachCell: handleChildStateChange}} />

          default: return <p className='text-white-50'>~ [Error] Wrong cell type detected ~</p>
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