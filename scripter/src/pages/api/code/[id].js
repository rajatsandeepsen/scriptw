const array = [
  ]



  const codeDB = new Map()
  codeDB.set('file1', array)
  export default function handler(req, res) {
        let request = req.query.id
        let responce = codeDB.get(request)
        
        responce === undefined ? res.status(404).json({message: 'not found'})
                               : res.status(200).json(responce)
  }
  