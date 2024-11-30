import express from 'express'
import router from './router/router.js'

const app = express();

app.use(express.json());

app.use('/',router);


const PORT = 8001;

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
})
