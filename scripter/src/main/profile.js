import useSwr from 'swr'
import Link from 'next/link'
import { fetchCatchError, swrOptions } from '@/functions/fetcher'
import styles from '@/styles/Home.module.scss'
import Loading from '@/components/loading'
import Router from 'next/router'
import { useSession, signIn } from "next-auth/react"
import { timeDifference } from '@/functions/object'

const Profile = ({userName}) => {
    const {data: session, status} = useSession()

    const {data, error, isLoading} = useSwr(`./api/data/${userName}`, fetchCatchError, swrOptions)
    
    if (isLoading) return <Loading error={null} />
    if (error) return <Loading error={error} login={{inside: <>Sign up with <i className="bi bi-github" /></>, func: () => signIn('github') }} />
    
    const method = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    async function handleSubmit(e){
      e.preventDefault()

      if (session?.user.email.split('@')[0] !== e.target.auther.value){
        alert('You are not authorized to do this action')
        return;
      }

      const formData = new FormData(e.target);
      let data = {};

      for (const [key, value] of formData.entries()) {
          if (key === 'visibility'){
            switch (value) {
              case 'true':
              case 'True':
              case 'TRUE':
              case 'public':
              case 'Public':
              case 'PUBLIC':
              case '1':
                          data[key] = true
                          break;
              default:  continue;
            }
          }
          else data[key] = value;
      }
      const res = await fetch(`./api/create/${userName}/${data.name}`, {...method, body: JSON.stringify(data)})
      if (res.status == 200) {
        Router.push(`/${userName}/${data.name}`)
     }
     else alert('Something went wrong')
    }
    return ( 
        <section className={`${styles.Profile} container`}>
          <header>
            <img src={data.image || `/person-circle.svg`} width={60} height={60} alt="scripter logo" />
            <h1> {data.name} </h1>
            <p> {data.email || ''} </p>
          </header>
          <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td className='d-none d-md-table-cell'>Title</td>
                <td className='d-none d-md-table-cell'>Visibility</td>
                <td className='d-none d-md-table-cell'>Created at</td>
                <td className='d-none d-md-table-cell'>Updated at</td>
                <td>{" "}</td>
              </tr>
            </thead>
            <tbody>
              {data.files.map((file, index) => (
                
                <tr key={index}>
                    <td> {file.name}.js </td>
                    <td className='d-none d-md-table-cell'> {file.title} </td>
                    <td className='d-none d-md-table-cell'><span className='myBadge'>{file.visibility ? "Public" : "Private"}</span></td>
                    <td className='d-none d-md-table-cell'> {timeDifference(new Date(file.createdAt), new Date())} </td>
                    <td className='d-none d-md-table-cell'> {timeDifference(new Date(file.updatedAt), new Date())} </td>

                    <td>
                      <Link key={index} href={`/${userName}/${file.name}`} target='_blank'><i className="bi bi-chevron-right" /></Link>
                    </td>
                </tr>
                
              ))}
            </tbody>
            
            {session?.user.email.split('@')[0] === data.name && <tfoot>
              <tr>
                <td colSpan={6} className='bg-transparent border-0'><p className='mt-5 lead p-2'>Create new file</p></td>
              </tr>
              
              <tr className='d-flex flex-column d-md-table-row'>
                <td><input type="text" name="name" placeholder="Name" minLength={4} maxLength={10} required/></td>
                <td><input type="text" name="title" placeholder="Title" minLength={1} maxLength={25} required/></td>
                <td className='d-flex flex-column p-2 gap-2 align-items-start'>
                  <span className='myBadge opacity-100 text-white-50 d-inline-flex'>
                    <input type="radio" name="visibility" defaultChecked value={'true'} required className='me-1'/>
                    Public 
                  </span>
                  <span className='myBadge opacity-100 text-white-50 d-inline-flex'>
                    <input type="radio" name="visibility" value={'false'} required className='me-1'/>
                    Private 
                  </span>
                </td>
                <td colSpan="2"><input type="text" name="description" placeholder="Description" maxLength={40} required/></td>  
                <td className='overflow-hidden'>
                  <button type='submit' className={`${styles.Button} justify-content-start border-0 rounded-0`}><i className="bi bi-chevron-right" /></button>
                </td>
                <input type="hidden" name="auther" value={data.name} />
              </tr>
            </tfoot>}
          </table>
          </form>
        </section>
     );
}
 
export default Profile;