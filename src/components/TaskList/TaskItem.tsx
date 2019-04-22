import React, {Component} from 'react';
import classNames from 'classnames';
import './TaskItem.scss';
import ITask from './ITask';

interface ITaskItemProps {
	task: ITask;
	active: boolean;
}

export default class TaskItem extends Component<ITaskItemProps> {
	render() {
		const className = classNames('TaskItem', {
			active: this.props.active
		});
		return (
			<div className={className} data-hour={this.props.task.hour}>
				<div className='hour'>{this.props.task.hour}</div>
				<div className='text'>{this.props.task.text}</div>
			</div>
		);
	}
}