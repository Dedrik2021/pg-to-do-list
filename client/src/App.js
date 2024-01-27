import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'

import ListHeader from './components/ListHeader';
import { getData } from './api/todos';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import Auth from './components/Auth';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
	const userEmail = cookies.Email;
	const [tasks, setTasks] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [mode, setMode] = useState('');
	const [taskData, setTaskData] = useState({});

	const authToken = cookies.AuthToken

	useEffect(() => {
    if (authToken) {
      getData(setTasks, userEmail);
    }
	}, [authToken]);

	const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

	return (
		<div className="app">
			{openModal && (
				<Modal
					getData={getData}
					setOpenModal={setOpenModal}
					setTasks={setTasks}
					mode={mode}
					taskData={taskData}
          cookies={cookies}
				/>
			)}
			{authToken ? (
				<>
					<ListHeader
						setOpenModal={setOpenModal}
						listName={'Holiday tick list'}
						setMode={setMode}
            removeCookie={removeCookie}
					/>
					<ul>
						{sortedTasks.map((task) => {
							return (
								<ListItem
									setTaskData={setTaskData}
									setOpenModal={setOpenModal}
									setMode={setMode}
									key={task.id}
									task={task}
									setTasks={setTasks}
									getData={getData}
								/>
							);
						})}
					</ul>
				</>
			) : (
        <Auth/>
      )}
		</div>
	);
};

export default App;
