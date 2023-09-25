import express from 'express'
import bodyParser from 'body-parser'
import filesRoute from './routes/filesRoute'
import usersRoute from './routes/usersRoute'

const app = express()

app.use(bodyParser.json())

app.use(filesRoute)
app.use(usersRoute)

export default app
