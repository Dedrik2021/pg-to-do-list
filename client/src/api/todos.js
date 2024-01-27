const getData = async (setData, data) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${data}`);
		if (!response.ok) {
			throw Error('Error to fetch data');
		}
		const responseData = await response.json();
		setData(responseData);
	} catch (err) {
		console.error(err);
	}
};

const createNewTask = async (data) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw Error('Error to fetch data createTask');
		}
	} catch (err) {
		console.error('Can not create new task, api', err);
	}
};

const updateTask = async (data, id) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/update/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw Error('Error to fetch data update task');
		}
		console.log(await response.json());
	} catch (err) {
		console.error('Error update task api', err);
	}
};

const removeTask = async (id) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`, {
			method: 'DELETE',
		});
        if (!response.ok) {
			throw Error('Error delete a task');
		}
	} catch (err) {
		console.error('Error delete a task api', err);
	}
};

module.exports = {
	getData,
	createNewTask,
	updateTask,
    removeTask
};
