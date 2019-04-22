import React, {Component} from 'react';
import './App.scss';
import TaskList from './components/TaskList';
import ITask from './components/TaskList/ITask';
import IMenuItem from './components/TaskList/Menu/IMenuItem';
import LocalStorage from './model/LocalStorage';
import HourlyTimer from './model/HourlyTimer';
import {version, name, description} from '../package.json';

console.log(name, description, `(версия ${version})`);

const hourlyTimer = new HourlyTimer;

const localStorage = new LocalStorage;
let tasks: ITask[] = localStorage.tasks;

interface IAppState {
	tasks: ITask[];
	activeHour: number;
}

export default class App extends Component<{}, IAppState> {
	state: IAppState = {tasks, activeHour: new Date().getHours()};

	constructor(props: {}) {
		super(props);
		hourlyTimer.on('tick', this.onHourlyTimerTick.bind(this));
	}

	render() {
		return (
			<div className="App">
				<TaskList
					tasks={tasks}
					activeHour={this.state.activeHour}
					onChange={this.onTaskListChange}
				/>
			</div>
		);
	}

	private onHourlyTimerTick(activeHour: number) {
		this.setState({activeHour});
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