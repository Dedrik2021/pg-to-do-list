import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import { removeTask } from '../api/todos';


const ListItem = ({ task, setMode, setOpenModal, setTaskData, getData, setTasks }) => {
    const userEmail = 'grun@gmail.com';
    const className = 'edit'
    const handleEditTaskModal = () => {
        setOpenModal(true)
        setMode(className)
        setTaskData(task)
    }

    const handleRemoveTask = async () => {
        await removeTask(task.id)
        getData(setTasks, userEmail)
    }

	return (
		<li className="list-item">
			<div className="info-container">
				<TickIcon />
				<p className="task-title">{task.title}</p>
				<ProgressBar progress={task.progress} />
			</div>
			<div className="button-container">
				<button className={className} onClick={handleEditTaskModal} type="button">Edit</button>
				<button className='delete' onClick={handleRemoveTask} type="button">Delete</button>
			</div>
		</li>
	);
};

export default ListItem;
