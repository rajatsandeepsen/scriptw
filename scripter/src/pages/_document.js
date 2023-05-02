import { Html, Head, Main, NextScript } from 'next/document'
import Image from 'next/image'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <footer>
        <Image src={'/scripter.svg'} width={50} height={50}></Image>
        <h6>Scriptw.js by @rajatsandeepsen</h6>
        <div className='d-flex gap-3 mt-1'>
        <a href="http://github.com/rajatsandeepsen" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"/></a>
        <a href="http://instagram.com/rajatsandeepsen" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"/></a>
        <a href="http://linkedin.com/in/rajatsandeepsen" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"/></a>
        <a href="http://twitter.com/rajatsandeepsen" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"/></a>
        </div>
        <p>open source release in June 31 2023</p>
      </footer>
    </Html>
  )
}
