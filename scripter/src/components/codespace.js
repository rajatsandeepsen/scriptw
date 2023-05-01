import Codespace from '@/components/codemirror'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())
const CodeSpaceContainer = ({fileName}) => {

    const {data: code, error: codeError, isLoading: codeLoading} = useSwr(`api/code/${fileName}`, fetcher)

    if (codeError) return <p>Failed to Load</p>
    if (codeLoading) return <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
    if (code === null) return <p>404 Code Cells not Found</p>
    
    return code.map((cell, i)=>(<Codespace key={i} data={cell} />))
}
 
export default CodeSpaceContainer;