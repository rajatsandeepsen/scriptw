const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let x = 0 

export default async function handler(req, res) {
    let request = req.query.question + `, answer in markdown format`
    try {
        res.status(200).json({content: "qwertyuio"})
        // res.status(404).json({message: 'Service Unavailable'})
        // console.log(x)


        // let completion = await openai.createChatCompletion({
        //         model: "text-davinci-003",
        //         messages: [{role: "user", content: request}],
        //     })
        //     let responce = completion?.data?.choices[0]?.message
        //     responce ? res.status(200).json(responce) : res.status(503).json({message: 'Service Unavailable'})
        //     x++
        
    }
    catch (err) { res.status(500).json({message: 'Internal Server Error'}); console.error(err) }
  }