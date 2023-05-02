const files = [
    {
      init:{
        x: 10,
        y: 20,
        z: 30
      },

      fileName: 'file1',
      fileTitle: 'Scripter',
      codespaceID: 'file1',
      fileDescription: `I hate Python, so i build a jupyter notebook for Javascript <br> Browser only, No Nodejs, No Jupyter Notebook Kernal, No Server required <br><br>
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
  