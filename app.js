const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const postRoutes = require('./routes/posts')

const cors = require('cors');   //Required for Day 17

const port = process.env.PORT || 3001

let postData=[];              //Day 17
const corsOption={            //Day 17  
      "origin":"*"            //Day 17
}
app.use(cors(corsOption));    //Day 17  

app.use(logger)
app.use(express.json());  

app.use('/api/post',postRoutes)


app.listen(port,()=>{
    console.log(`Server started at Port : ${port}`)
})  