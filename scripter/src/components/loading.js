import styles from '@/styles/Home.module.scss'
import Router from 'next/router'

const Loading = ({error, login}) => {
    
    return (
        <section className={`d-flex container justify-content-center align-items-center ${styles.Loading}`}>
        {
                
                error === null ? <div className="spinner-border text-white m-auto" role="status"><span className="sr-only"></span></div>
                               : <div className="d-flex flex-column gap-3">
                                    <p className='lead'>{error.status} : {error.info.message}</p>
                                    <button className={styles.Button} type="button" onClick={() => Router.back()}>
                                        Go Back <i className="bi bi-arrow-return-left"/>
                                    </button>
                                    { login && <button className={styles.Button} onClick={login.func} >{login.inside}</button> }
                                </div>
            }
        </section> 
     );
}
 
export default Loading;