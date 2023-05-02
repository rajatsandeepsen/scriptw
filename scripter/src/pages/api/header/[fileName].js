const files = [
    {
      init:{
        x: 10,
        y: 20,
        z: 30,
        url: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600",
        sus: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      },

      fileName: 'file1',
      fileTitle: 'ScriptW',
      codespaceID: 'file1',
      fileDescription: `I hate Python, so I build a Jupyter Notebook alternative for Javascript. <br>its Browser only, No Node.js, No Jupyter Notebook Kernal, No Server required.<br>
      <br><ul style="list-style-type: disc; margin-left:2rem;">
        <li> JSON File for State Management</li>
        <li> Custom Console & DOM Editor</li>
        <li> Github Dark Theamed Syntax Highlighting</li>
        <li> VSCode Keyboard Shortcuts</li>
        <li> Async Input Prompt & Thread Sleep</li>
      </ul><br>
      <p>#beta release 1.0v</p>
      <iframe src="https://ghbtns.com/github-btn.html?user=rajatsandeepsen&type=follow&count=true" frameborder="0" scrolling="0" width="230" height="30" title="GitHub"></iframe>`,
    },
  ]

// const values = JSON.stringify(dataValue, undefined, 4)
  export default function handler(req, res) {
    let request = req.query.fileName
  
    let responce = files.find(e => e.fileName === request)
    
    responce === undefined ? res.status(404).json({message: 'not found'})
                           : res.status(200).json(responce)
  }
  