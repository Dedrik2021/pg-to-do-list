const express = require('express');

const { getTodos, createNewTask, updateTask, removeTask } = require('../controllers/todos');

const router = express.Router();

router.get('/:userEmail', getTodos);
router.post('/create', createNewTask);
router.patch('/update/:id', updateTask);
router.delete('/delete/:id', removeTask);

module.exports = router;
