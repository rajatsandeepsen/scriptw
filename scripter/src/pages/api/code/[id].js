import { v4 as uuidv4 } from 'uuid';

const array = [
    {init: `let x = 10 + 20
    console.log(x)`, output: '', cellID: uuidv4()},
    {init: `2`, output: 'something', cellID: uuidv4()},
    {init: `input("skdnfjsndkfnksnd").then(e=> console.log(e))`, output: '', cellID: uuidv4()},
  ]



  const codeDB = new Map()
  codeDB.set('file1', array)
  export default function handler(req, res) {
        let request = req.query.id
        let responce = codeDB.get(request)
        
        responce === undefined ? res.status(404).json({message: 'not found'})
                               : res.status(200).json(responce)
  }
  