import { useState } from 'react';

import { createNewTask, updateTask } from '../api/todos';

const Modal = ({ mode, setOpenModal, taskData, getData, setTasks, cookies }) => {
	const editMode = mode === 'edit' ? true : false;
	const [data, setData] = useState({
		user_email: editMode ? taskData.user_email : cookies.Email,
		title: editMode ? taskData.title : '',
		progress: editMode ? taskData.progress : '',
		date: editMode ? taskData.date : new Date(),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((data) => {
			return {
				...data,
				[name]: value,
			};
		});
	};

	const postData = async (e) => {
		e.preventDefault();
        await createNewTask(data)
        getData(setTasks, data.user_email)
        setOpenModal(false)
	};

    const handleEditTask = async (e) => {
        e.preventDefault()
        await updateTask(data, taskData.id)
        getData(setTasks, data.user_email)
        setOpenModal(false)
    }

	return (
		<div className="overlay">
			<div className="modal">
				<div className="form-title-container">
					<h3>Let's {mode} you task</h3>
					<button type="button" onClick={() => setOpenModal(false)}>
						x
					</button>
				</div>

				<form onSubmit={editMode ? handleEditTask : postData}>
					<label htmlFor="tit"></label>
					<input
						id="tit"
						required
						maxLength={30}
						placeholder="Your task goes here"
						type="text"
						name="title"
						value={data.title}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor="rg">Drug to select your current progress</label>
					<input
						type="range"
						id="rg"
						required
						min={0}
						max={100}
						name="progress"
						value={data.progress}
						onChange={handleChange}
					/>
					<button className={mode} type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
