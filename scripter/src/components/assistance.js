import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/styles/Home.module.scss'
import { useState,useEffect } from 'react'
import 'github-markdown-css/github-markdown-dark.css'

export function AskGPT(){
        // const {init, cellID} = data
        
        const [input, setInput] = useState("")
        const [isEditing, setIsEditing] = useState(false)
        
        useEffect(() => {
            
            setInput("A polyfill is a piece of code that lets you use modern JavaScript features on older browsers that don’t support those features.\n\nTo write a polyfill function in JavaScript, follow these steps:\n\n1. Check if the feature is supported\n\nBefore writing a polyfill function, you need to check if the feature is already supported by the browser. You can do this by checking if the feature is in the global namespace or by using the `typeof` operator to check if the feature is `undefined`.\n\n```javascript\nif (!String.prototype.startsWith) {\n  // Function implementation here\n}\n```\n\n2. Write the polyfill function\n\nWrite the polyfill function according to the specification of the feature. You can find the specification on the MDN web docs.\n\n```javascript\nif (!String.prototype.startsWith) {\n  String.prototype.startsWith = function(search, position) {\n    position = position || 0;\n    return this.indexOf(search, position) === position;\n  };\n}\n```\n\n3. Test the polyfill function\n\nAfter writing the polyfill function, test it on different browsers to ensure that it works correctly. You can use services like BrowserStack or Sauce Labs for cross-browser testing.\n\n4. Use the polyfill function\n\nFinally, use the polyfill function in your code wherever you need to use the feature.\n\n```javascript\nvar str = 'Hello world';\nif (str.startsWith('Hello')){\n    console.log('Starts with Hello');\n} else {\n    console.log('Does not start with Hello');\n}\n```\n\nBy following these steps, you can write your own polyfill functions in JavaScript to support older browsers.")
        }, []);
        
        return (
            <div className={`${styles.Markdown} container`}>
                <ReactMarkdown className={`markdown-body p-5 bg-black`} remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>

            </div>
        )
}


