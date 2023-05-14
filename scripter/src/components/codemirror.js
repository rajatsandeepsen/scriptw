import styles from "@/styles/Home.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useState, useRef, useEffect } from "react";
import {
  consoleTemplate,
  inputTemplate,
  sharedJsonDom,
  loadAndRun,
} from "@/functions/input";

export default function Codespace({ index, data, func, editable }) {
  const { init, output, id, runs } = data;
  const { deleteFunc, clearFunc, onChageEachCell, pushToRef } = func;
  const saveThisCell = useRef();

  const [codes, setCodes] = useState(init);
  const [result, setResult] = useState(output ?? "");
  const [isRunning, setRunning] = useState(false);
  const [open, setOpen] = useState(false);

  const compute = useRef();
  const noOfTimes = useRef(runs);

  useEffect(() => {
    if (open) setTimeout(() => { setOpen(false) }, 4000);
  }, [open]);

  pushToRef(()=>saveThisCell.current());

  saveThisCell.current = () =>{
    onChageEachCell(id, { init: codes, output: result, runs: noOfTimes.current })
  }

  compute.current = () => {
    setRunning(true);
    noOfTimes.current += 1;
    let runable =
      consoleTemplate(id) +
      inputTemplate() +
      sharedJsonDom() +
      loadAndRun() +
      codes;
    // console.log(runable);
    document.getElementById(id + "result").innerHTML = "";
    try {
      new Function(runable)();
    } catch (e) {
      document.getElementById(
        id + "result"
      ).innerHTML += `<span class='err'>${e}</span>`;
    } finally {
      setResult(() => document.getElementById(id + "result").innerHTML);
      setTimeout(() => {setRunning(false); saveThisCell.current()}, 1000);
    }
  };

  function callRefCompute(e) {
    if (e.keyCode == 13 && e.shiftKey) {
      e.preventDefault();
      compute.current();
    }
  }

  function RunButton(){
    return (
      <button disabled={isRunning} title="Shift + Enter" onClick={compute.current} className={`${styles.Button} ${"runButton"}`} >
            {isRunning ? (
              <span className="d-flex gap-1 align-items-center">
                <i className="spinner-border spinner-border-sm"></i>
              </span>
            ) : (
              <span className="d-flex gap-1 align-items-center">
                Run <i className="bi bi-gear-fill" />
              </span>
            )}
      </button>
    )
  }

  return (
    <section className="container d-flex flex-column align-items-center gap-3">
      <div
        id={id}
        onKeyDown={callRefCompute}
        className={`${styles.codespace} printCell`}
        data-running={isRunning ? "✱" : noOfTimes.current || 0}
        tabIndex="0"
      >
        <CodeMirror value={codes || `// Let start coding\n// (Shift + Enter) to Execute\n`} min-height="200px" theme={githubDark} extensions={[javascript({ jsx: true })]} onChange={(value) => setCodes(value)} />

        <ul className="cellButtons">
            {/*<button disabled={true} title="del" onClick={() => deleteFunc(index)} className={`${styles.Button} ${open? "visible":"invisible"}`} >
              Cell <i className="bi bi-trash-fill" />
            </button>*/}
            
            <span></span>
            <span></span>
            <button disabled={!editable} title="ctrl + backspace" onClick={() => clearFunc(index)} className={`${styles.Button} ${open? "visible":"invisible"}`} >
              Clear <i className="bi bi-eraser-fill" />
            </button>
            
            <button disabled={!editable} onClick={() => setOpen(!open)} className={styles.Button}>
              Open <i className="bi bi-grid-fill" />
            </button>

            <button disabled={!editable} title="ctrl + S" onClick={saveThisCell.current} className={`${styles.Button} saveCell ${open? "visible":"invisible"}`} >
              Save <i className="bi bi-save2" />
            </button>
          
            <RunButton />
        </ul>
      
      </div>
      <code
        id={id + "result"}
        className={styles.results}
        dangerouslySetInnerHTML={{ __html: result === "" ? "" : result }}
      />
    </section>
  );
}
