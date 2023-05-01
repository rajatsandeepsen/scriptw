import styles from '@/styles/Home.module.scss'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubDark } from '@uiw/codemirror-theme-github';


export default function SharedDom({data}) {
    const dataValue = {
        name: 'Jane Doe',
        city: 'New York',
        lastContacts: ['2022-01-01', '2022-03-21', '2022-04-11', '2022-05-15'],
        hi: {name: 'help'},
        hus: () => {console.log('hello')},
        number: 123456789,
    }
    const values = JSON.stringify(dataValue, undefined, 4)
  return (
        <section id='shared' className='d-flex flex-column align-items-center w-100 gap-3'>
          <div className={styles.codespace}>
           
           <CodeMirror
            value={values}
            height='200'
            theme={githubDark}
            extensions={[json()]}
            // onChange={(value) => setCodes(value)}
            />
          </div>
        </section>
  )
}
