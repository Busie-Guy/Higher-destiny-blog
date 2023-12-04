const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// get all tasks
app.get('/todos/:userEmail', async (req, res) => {
	const userEmail = req.params.userEmail
	try	{
		const todos = await pool.query('SELECT * FROM todos WHERE user_email=$1', [userEmail])
		res.json(todos.rows)
		console.log(todos)
  } catch (err) {
		console.error(err)
	}

})

//create new task 
app.post('/todos', async (req, res) => {
	try {
		const {user_email, title, progress,date} = req.body
		console.log('server:', user_email, title, progress,date)
		const id = uuidv4()
		const newToDo = await pool.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)',
		[id, user_email, title, progress, date])
		res.json(newToDo)
	} catch (err) {
		console.error(err)
	}

})

app.post('/blog', async (req, res) => {
	try {
		const {title, text, events} = req.body
		console.log('server:', title)
		const id = uuidv4()
		const newPost = await pool.query('INSERT INTO post (id, title, text) VALUES ($1, $2, $3)',
		[id, title, text])
		events?.map(event => pool.query('INSERT INTO event (event_id, post_id, date, place, event_text) VALUES ($1, $2, $3, $4, $5)',
		[event.id, id, event.date, event.place, event.eventText]),)
		res.json(newPost)
	} catch (err) {
		console.error(err)
	}

})

//edit task
app.put('/todos/:id', async (req, res) => {
	const { id } = req.params
	const { user_email, title, progress, date } = req.body

	try {
		const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;', 
		[user_email, title, progress, date, id])
		res.json(editToDo)
	} catch (err) {
		console.error(err)
	}
})

//delete task
app.delete('/todos/:id', async (req, res) => {
	const { id } = req.params
	try {
		const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
		res.json(deleteToDo)
	} catch (err) {
		console.error(err)
	}
})

//sing up
app.post('/signup', async (req, res) => {
	const { email, password } = req.body
	const salt =bcrypt.genSaltSync(10)
	const hashPassword = bcrypt.hashSync(password, salt)

	try {
		const signUp = await pool.query('INSERT INTO users (user_email, hashed_password) VALUES ($1, $2)', 
		[email, hashPassword])

		const token = jwt.sign({ email }, 'secred', { expiresIn: '1h' })

		res.json({ email, token })
	} catch (err) {
		console.error(err)
		if(err) {
			res.json({ detail: err.detail })
		}
	}

})


//login
app.post('/login', async (req, res) => {
	const { email, password } = req.body
	console.log('LOGIN email:' ,email)
	
	try {
		const users = await pool.query('SELECT * FROM users WHERE user_email=$1', [email])

		if(!users.rows.length) return res.json({detail: 'User does not exist'})

		const success = await bcrypt.compare(password, users.rows[0].hashed_password)
		const token = jwt.sign({ email }, 'secred', { expiresIn: '1h' })

		if(success){
			console.log('success email:', users.rows[0].user_email)
			res.json({'email' : users.rows[0].user_email, token})
		} else {
			res.json({ detail : 'Login failed'})
		}
	} catch (err) {
		console.error(err)
	}

})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))