import useSwr from 'swr'
import { v4 as uuidv4 } from 'uuid';
import Markdown from '@/components/markdown'

const fetcher =     async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        error.info = await res.json()
        error.status = res.status
        throw error
    }        

    return res.json()
}
const id = uuidv4()
let responce = <div className="spinner-border" role="status"><span className="sr-only"></span></div>

const GPTFetched = ({input}) => {
    const {data, error, isLoading} = useSwr(`api/askGPT?question=${input}`, fetcher,{
        // revalidateOnFocus: false,
        // revalidateOnMount:false,
        // revalidateOnReconnect: false,
        // refreshWhenOffline: false,
        // refreshWhenHidden: false,
        refreshInterval: 0
      })

    console.log(data, error, isLoading)
    if (isLoading) 
        return <div className='bg-black d-flex p-5 w-100 justify-content-center'>{responce}</div>

    if (error || !data) {
        let message = error?.info?.message || "Data not found" 
        let code = error?.status || "200" 

        let errorData = `> ${message}\n\n> HTTP response status code: \`${code}\``
        return <Markdown data={{init:errorData, cellID: id }} />
    }
    
    return ( <Markdown data={{init:data.content, cellID: id }} /> );
}
 
export default GPTFetched;