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


// get all post

app.get('/blog', async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM post;');
    const postsWithEvents = await Promise.all(
      posts.rows.map(async (post) => {
        const events = await pool.query('SELECT * FROM event WHERE post_id = $1', [post.id]);
				const eventsWithDateObjects = events.rows.map(event => ({
					...event,
					date: event.date.toLocaleString('sv-SE', { timeZone: 'Europe/Warsaw' })
				}));
        return { ...post, events: eventsWithDateObjects };
      })
    );
    res.json(postsWithEvents);
  } catch (err) {
    console.error(err);
  }
});


//create new post

app.post('/blog', async (req, res) => {
	try {
		const {title, text, events} = req.body
		const date = new Date()
		const id = uuidv4()
		const newPost = await pool.query('INSERT INTO post (id, title, text, date) VALUES ($1, $2, $3, $4)',
		[id, title, text, date])
		events?.map(event => pool.query('INSERT INTO event (event_id, post_id, date, place, event_text) VALUES ($1, $2, $3, $4, $5)',
		[event.event_id, id, event.date, event.place, event.event_text]),)
		res.json(newPost)
	} catch (err) {
		console.error(err)
	}

})


//edit post

app.put('/blog/:id', async (req, res) => {
	const { id } = req.params
	const { title, text, events } = req.body

	try {
		const editPost = await pool.query('UPDATE post SET title = $1, text = $2 WHERE id = $3;', 
		[title, text, id])
		await pool.query('DELETE FROM event WHERE post_id=$1', [id])
		await events?.map(event => pool.query('INSERT INTO event (event_id, post_id, date, place, event_text) VALUES ($1, $2, $3, $4, $5)',
		[event.event_id, id, event.date, event.place, event.event_text]),)
		res.json(editPost)
	} catch (err) {
		console.error(err)
	}
})

// //delete task
// app.delete('/todos/:id', async (req, res) => {
// 	const { id } = req.params
// 	try {
// 		const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
// 		res.json(deleteToDo)
// 	} catch (err) {
// 		console.error(err)
// 	}
// })

//delete task
app.delete('/blog/:id', async (req, res) => {
	const { id } = req.params
	try {
		const deleteEvents = await pool.query('DELETE FROM event WHERE post_id = $1', [id])
		const deletePost = await pool.query('DELETE FROM post WHERE id = $1;', [id])
		res.json({deletePost,deleteEvents})
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