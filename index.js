require('dotenv').config()
const express=require('express');
const morgan=require('morgan')
const sequelize=require('./db')
const models=require('./models/models')
const fileUpload=require('express-fileupload')
const cors=require('cors')
const router= require('./routes/index')
const errorMiddleware=require('./middleware/errorMiddleware')
const path=require('path')

const app=express();
const PORT=process.env.PORT || 8080;

app.use(morgan('tiny'))
app.use(cors())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()