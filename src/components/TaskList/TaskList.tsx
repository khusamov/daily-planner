import React, {Component, MouseEvent} from 'react';
import TaskItem from './TaskItem';
import ITask from './ITask';
import Menu from './Menu';
import IMenuItem from './Menu/IMenuItem';
import './TaskList.scss';

interface ITaskListProps {
	onChange: (taskItemHour: number, menuItem: IMenuItem) => void;
	tasks: ITask[];
	activeHour: number;
}

interface ITaskListState {
	menu: {
		taskItemHour: number;
		visibled: boolean;
		coord: {
			x: number;
			y: number;
		}
	}
}

export default class TaskList extends Component<ITaskListProps, ITaskListState> {
	state: ITaskListState = {
		menu: {
			taskItemHour: 0,
			visibled: false,
			coord: {
				x: 0,
				y: 0
			}
		}
	};

	render() {
		return (
			<div className='TaskList' onContextMenu={this.onRootDivClick}>
				{
					this.state.menu.visibled && (
						<Menu
							coord={this.state.menu.coord}
							onBlur={this.onMenuBlur}
							onItemClick={this.onMenuItemClick}
						/>
					)
				}
				{
					this.props.tasks.map((task, index) => (
						<TaskItem
							key={index}
							task={task}
							active={this.props.activeHour === task.hour}
						/>
					))
				}
			</div>
		);
	}

	private onMenuBlur = () => {
		this.hideMenu();
	};

	private hideMenu() {
		this.setState({
			menu: {
				taskItemHour: 0,
				visibled: false,
				coord: {
					x: 0,
					y: 0
				}
			}
		});
	}

	private onMenuItemClick = (menuItem: IMenuItem) => {
		this.props.onChange(this.state.menu.taskItemHour, menuItem);
		this.hideMenu();
	};

	private onRootDivClick = (event: MouseEvent<HTMLDivElement>) => {

		event.preventDefault();

		let taskItemHour = 0;

		const taskItemElement = (event.target as HTMLDivElement).parentElement;
		if (taskItemElement) {
			taskItemHour = Number(taskItemElement.getAttribute('data-hour'));
		}

		this.setState({
			menu: {
				taskItemHour: taskItemHour,
				visibled: true,
				coord: {
					x: event.clientX,
					y: event.clientY
				}
			}
		});
	};
}