const { createDir, names, readAllFilesFromDir } = require("./filing");

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const msg = []

app.get("/", (req, res) => {
    
    if (msg.length) {
        msg.forEach((val) => {
                createDir(val.message);
            
        })
    }
    return res.json({
      message: msg.map(val=>val.message)
    });
});

app.post('/content', (req, res) => {
    msg.push({
      message: req.body.message
    });
    res.json(msg)
})

app.get('/filename',async (req, res) => {
        return res.json({
          content: await readAllFilesFromDir(),
        })
   
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running Succesfully on port ${PORT}`)
})
