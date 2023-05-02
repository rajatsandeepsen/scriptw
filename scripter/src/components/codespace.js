import Codespace from '@/components/codemirror'
import { useEffect, useImperativeHandle,forwardRef, useState } from 'react'
import useSwr from 'swr'
import styles from '@/styles/Home.module.scss'

function removeElementAtIndex(arr, index) {
    if (index < 0 || index >= arr.length) {
      throw new Error('Index out of bounds');
    }
    const newArr = [...arr];
    newArr.splice(index, 1);
    return newArr;
  }


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
    


    function newCell(){
        const x = {
            init: '// start coding here',
            output: ''
        }
        setCells((cells) => [...cells, x])
    }
    const deleteCell = (index) => setCells(cells.filter((value, arrIndex) => index !== arrIndex))
    const  clearCell = (index) => setCells((cells) => cells.map((cell, arrIndex) => index === arrIndex ? {output:' ', init: ' '} : cell ))

    return (
        <>
        {cells.length > 0? 
                           cells.map((eachCell, i)=>(<Codespace key={i} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell}} />)) 
                         : <span className='d-flex flex-column align-items-center'><p className='text-white-50'>Create new cell to start coding</p>
                            <i className="bi bi-arrow-down text-white-50"/></span>
        }
        <ul className='d-flex gap-3'>
          <button onClick={newCell} className={styles.Button}>
            Add Cell <i className="bi bi-plus-square-fill"></i>
          </button>
          <button  disabled className={styles.Button}>
            Markdown <i className="bi bi-hash"></i>
          </button>
          <button disabled  className={styles.Button}>
            Web Builder <i className="bi bi-filetype-html"></i>
          </button>
        </ul>
        </>
        )
})
 
export default CodeSpaceContainer;