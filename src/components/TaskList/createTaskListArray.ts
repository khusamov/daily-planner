import ITask from './ITask';

export default function createTaskListArray(count: number = 14, offset: number = 7): ITask[] {
	return Array(14).fill(null).map<ITask>((_null, index) => ({hour: index + 7}));
}