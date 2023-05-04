const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
    let request = req.query.question
    let completion
    try {
        completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0301",
            messages: [{role: "user", content: request}],
        })
    }
    catch (err) { res.status(502).json({message: err}) }
    

    
    let responce = completion.data.choices[0].message
    responce ?  res.status(200).json(responce)
             :  res.status(404).json({message: 'Some Kind of Error Occured'})
  }