// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const files = [
    {
      init:{
        x: 10,
        y: 20,
        z: 30
      },

      fileName: 'file1'
    },
  ]

// const values = JSON.stringify(dataValue, undefined, 4)
  export default function handler(req, res) {
    let request = req.query.fileName
  
    let responce = files.find(e => e.fileName === request)
    
    responce === undefined ? res.status(404).json({message: 'not found'})
                           : res.status(200).json(responce)
  }
  