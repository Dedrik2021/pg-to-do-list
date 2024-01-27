const express = require("express")
const cors = require('cors')

const todosRouter = require('./routes/todos')
const usersRouter = require('./routes/user')

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(cors())
app.use(express.json())
app.use('/api/todos', todosRouter)
app.use('/api/user', usersRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
})