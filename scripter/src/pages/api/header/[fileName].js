const files = [
    {
      init:{
        x: 10,
        y: 20,
        z: 30,
        url: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600",
        sus: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
        braindotjs : 'https://unpkg.com/brain.js@2.0.0-beta.23/dist/browser.js',
        chartjs: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js'
      },

      fileName: 'file1',
      fileTitle: 'ScriptW (beta)',
      codespaceID: 'file1',
      fileDescription: `Script Writer<br>In-Browser Jupyter Notebook Alternative for JavaScript.<br>Browser only, No Node.js, No Notebook Kernels, No Server required.<br><br>
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
  