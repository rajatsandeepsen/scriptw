// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const files = [
    {init: {
      name: 'Jane Doe',
      city: 'New York',
      lastContacts: ['2022-01-01', '2022-03-21', '2022-04-11', '2022-05-15'],
      hi: {name: 'help'}, 
      number: 123456789,
  },fileName: 'file1',},
  ]

// const values = JSON.stringify(dataValue, undefined, 4)
  export default function handler(req, res) {
    let request = req.query.fileName
  
    let responce = files.find(e => e.fileName === request)
    
    responce === undefined ? res.status(404).json({message: 'not found'})
                           : res.status(200).json(responce)
  }
  