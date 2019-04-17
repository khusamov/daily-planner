import React, {Component} from 'react';
import classNames from 'classnames';
import './TaskItem.scss';
import ITask from './ITask';

interface ITaskItemProps {
	task: ITask;
}

export default class TaskItem extends Component<ITaskItemProps> {
	render() {
		const className = classNames('TaskItem', {
			active: new Date().getHours() === this.props.task.hour
		});
		return (
			<div className={className} data-hour={this.props.task.hour}>
				<div className='hour'>{this.props.task.hour}</div>
				<div className='text'>{this.props.task.text}</div>
			</div>
		);
	}
}