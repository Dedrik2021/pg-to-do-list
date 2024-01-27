const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

const getTodos = async (req, res, next) => {
	let todos;
	const { userEmail } = req.params;
	try {
		todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
	} catch (err) {
		console.error('error can not get todos', err);
		return next('error can not get todos', err);
	}

	res.json(todos.rows);
};

const createNewTask = async (req, res, next) => {
	const { user_email, title, progress, date } = req.body;
	const id = uuidv4();
	let newTask;
	try {
		newTask = await pool.query(
			`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
			[id, user_email, title, progress, date],
		);
	} catch (err) {
		return next('Error create new data', err);
	}

	res.json(newTask);
};

const updateTask = async (req, res, next) => {
	const { id } = req.params;
	const { user_email, title, progress, date } = req.body;
	let updatedTask;

	try {
		updatedTask = await pool.query(
			`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`,
			[user_email, title, progress, date, id],
		);
	} catch (err) {
		return next('Error update task', err);
	}

	res.json(updatedTask);
};

const removeTask = async (req, res, next) => {
    const {id} = req.params
    try {
        await pool.query(`DELETE FROM todos WHERE id = $1`, [id])
    } catch(err) {
        return next('Error to delete a task', err)
    }

    res.json({message: 'Task has been deleted successfully!'})
}

module.exports = {
	getTodos,
	createNewTask,
    updateTask,
    removeTask
};
