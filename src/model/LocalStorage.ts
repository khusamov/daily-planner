import ITask from '../components/TaskList/ITask';
import createTaskListArray from '../components/TaskList/createTaskListArray';

export default class LocalStorage {
	private _tasks: ITask[];

	constructor() {
		let tasks: ITask[] = JSON.parse(window.localStorage.getItem('day-planner-tasks') || '[]');
		if (!tasks.length) {
			tasks = createTaskListArray();
			window.localStorage.setItem('day-planner-tasks', JSON.stringify(tasks));
		}
		this._tasks = tasks;
	}

	get tasks(): ITask[] {
		return this._tasks;
	}

	set tasks(tasks: ITask[]) {
		this._tasks = tasks;
		window.localStorage.setItem('day-planner-tasks', JSON.stringify(tasks));
	}
}