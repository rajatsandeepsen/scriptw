import Codespace from "@/components/codemirror";
import { useEffect, useImperativeHandle, forwardRef, useState,useRef } from "react";
import useSwr from "swr";
import styles from "@/styles/Home.module.scss";
import WebBuilder from "@/components/WebBuilder";
import Loading from "@/components/loading";
import Markdown from "@/components/markdown";
import { v4 as uuidv4 } from "uuid";
import { fetchCatchError, swrOptions } from "@/functions/fetcher";
import { deepCheck } from "@/functions/object";



const CodeSpaceContainer = forwardRef((props, ref) => {
  const id = props.fileId;
  const editable = props.editable

  const {
    data: code,
    error: codeError,
    isLoading: codeLoading,
  } = useSwr(`../api/code/${id}`, fetchCatchError, swrOptions);
  const [cells, setCells] = useState([]);
  const cellRef = useRef([]);

  function pushToRef(e){
    cellRef.current.push(e)
  }
  function saveAllCellsArray(){
    cellRef.current.forEach((each) => {
      each()
    })
  }
  async function updateTheFile() {

    saveAllCellsArray();

    let updateArray = [];
    let createArray = [];

    cells?.forEach((each, i) => {
      if (!deepCheck(each, code[i])) {

        if (code[i] === undefined) {
          if (each.init.trim() !== "") createArray.push(each);
        } else updateArray.push(each);
      }
    });

    if (updateArray.length > 0 || createArray.length > 0) {

      fetch(`../api/code/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ update: updateArray, create: createArray }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      return true;
    }
    return false;
  }

  useImperativeHandle(ref, () => ({
    deleteAllCell: () => setCells([]),
    updateTheFile: updateTheFile,
  }));

  useEffect(() => {
    if (code){
      code.sort((a, b) => a.createdAt > b.createdAt)
      setCells(() => code)
    }
  }, [code]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.keyCode == 78) {
        e.preventDefault(); 
        newCell('cell')
      }
    })
  }, [])

  if (codeLoading) return <Loading error={null} />;
  if (codeError) return <Loading error={codeError} />;

  const handleChildStateChange = (id, newState) => {
    const index = cells.findIndex((obj) => obj.id === id);

    const newArray = [...cells];
    newArray[index] = { ...newArray[index], ...newState, id: id };
    
    setCells(newArray);
  };

  async function newCell(type) {
    saveAllCellsArray();
    
    let x = { output: "", id: uuidv4() };

    if (type === "cell") {
      x.type = "cell";
      x.init = "";
    } else if (type === "markdown") {
      x.type = "markdown";
      x.init = "### Double click to Edit\n### Shit + Enter to Save\n";
    } else if (type === "web") {
      x.type = "web";
      x.init = "// Auto Run Enabled\n";
      x.HTML = `<!-- let start building websites -->\n`;
      x.CSS = `/* don't forget to change color */\n`;
    }
    if (cells.length === 0 || !Array.isArray(cells)) setCells([x]);
    else setCells((cells) => [...cells, x]);
  }

  const deleteCell = (index) =>
    setCells(cells.filter((value, arrIndex) => index !== arrIndex));
  const clearCell = (index) =>
    setCells((cells) =>
      cells.map((cell, arrIndex) => {
        if (index === arrIndex) {
          let fresh = {};
          for (const [key, value] of Object.entries(cell)) {
            fresh[key] = "";
          }
          fresh.id = cell.id;
          fresh.type = cell.type;
          return fresh;
        } else return cell;
      })
    );

  const PageButtons = () => {
    return (
      <div className="container d-flex">
      
      <ul className="mx-auto btn-group cellButtons">
        <button title="Alt + N" disabled={!editable}
          onClick={() => newCell("cell")}
          className={`${styles.Button} rounded-0 border-end-0 rounded-start`}
        >
          Add Cell <i className="bi bi-plus-square-fill"></i>
        </button>
        <button title="bug fix"
          disabled={true}
          onClick={() => newCell("web")}
          className={`${styles.Button} rounded-0 border-end-0`}
        >
          Web Builder <i className="bi bi-box-fill"></i>
        </button>
        <button disabled={!editable}
          onClick={() => newCell("markdown")}
          className={`${styles.Button} rounded-0 rounded-end`}
        >
          Markdown <i className="bi bi-markdown-fill"></i>
        </button>
      </ul>
      </div>
    );
  };

  function AllCodeSpace() {
    if (!Array.isArray(cells) || !cells.length) {
      return (
        <span className="d-flex flex-column align-items-center">
          <p className="text-white-50">Create new cell to start coding</p>
          <i className="bi bi-arrow-down text-white-50" />
        </span>
      );
    }

    return cells.map((eachCell, i) => {
      switch (eachCell.type) {
        // case 'web': return <WebBuilder key={eachCell.id} index={i} data={eachCell} func={{deleteFunc:deleteCell, clearFunc: clearCell, onChageEachCell: handleChildStateChange}} />
        case "cell":
          return (
            <Codespace
              key={eachCell.id}
              index={i}
              editable={editable}
              data={eachCell}
              func={{
                deleteFunc: deleteCell,
                clearFunc: clearCell,
                onChageEachCell: handleChildStateChange,
                pushToRef: pushToRef
              }}
            />
          );
        case "markdown":
          return (
            <Markdown
              key={eachCell.id}
              index={i}
              editable={editable}
              data={eachCell}
              func={{
                deleteFunc: deleteCell,
                clearFunc: clearCell,
                onChageEachCell: handleChildStateChange,
                pushToRef: pushToRef
              }}
            />
          );

        default:
          return (
            <p className="text-white-50">
              ~ [Error] Wrong cell type detected ~
            </p>
          );
      }
    });
  }

  return (
    <>
      <AllCodeSpace />
      <PageButtons />
    </>
  );
});

export default CodeSpaceContainer;
