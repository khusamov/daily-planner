import React, {Component} from 'react';
import './App.scss';
import TaskList from './components/TaskList';
import ITask from './components/TaskList/ITask';
import IMenuItem from './components/TaskList/Menu/IMenuItem';
import LocalStorage from './model/LocalStorage';

const localStorage = new LocalStorage;
let tasks: ITask[] = localStorage.tasks;

interface IAppState {
	tasks: ITask[];
}

export default class App extends Component<{}, IAppState> {
	state: IAppState = {tasks};

	render() {
		return (
			<div className="App">
				<TaskList tasks={tasks} onChange={this.onTaskListChange} />
			</div>
		);
	}

	private onTaskListChange = (taskItemHour: number, menuItem: IMenuItem) => {
		const tasks = Array(...this.state.tasks);

		const text = menuItem.action === 'delete' ? '' : menuItem.text;
		const foundTask = tasks.find(task => task.hour === taskItemHour);
		if (foundTask) {
			foundTask.text = text;
		}

		this.setState({tasks});
		localStorage.tasks = tasks;
	};
}