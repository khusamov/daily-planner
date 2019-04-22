import React, {Component, CSSProperties, MouseEvent, RefObject} from 'react';
import './Menu.scss';
import IMenuItem from './IMenuItem';

interface IMenuProps {
	onBlur?: () => void;
	onItemClick?: (item: IMenuItem) => void;
	coord: {
		x: number;
		y: number;
	}
}

const items: IMenuItem[] = [{
	text: 'Удалить',
	action: 'delete'
}, {
	text: 'ПСК'
}, {
	text: 'Стелпласт'
}, {
	text: 'Ecohouse'
}, {
	text: 'Окна Санни'
}, {
	text: 'Пластокно'
}, {
	text: 'Московская Оконница'
}, {
	text: 'Панокна'
}, {
	text: 'Другое'
}];

export default class Menu extends Component<IMenuProps> {
	private readonly menuRef: RefObject<HTMLDivElement>;

	constructor(props: IMenuProps) {
		super(props);
		this.menuRef = React.createRef<HTMLDivElement>();
	}

	componentDidMount(): void {
		if (this.menuRef.current) {
			this.menuRef.current.focus();
		}
	}

	render() {
		const style: CSSProperties = {
			position: 'absolute',
			left: this.props.coord.x,
			top: this.props.coord.y
		};
		return (
			<div style={{position: 'relative'}}>
				<div className='Menu' style={style} tabIndex={0} ref={this.menuRef} onBlur={this.onMenuDivBlur}>
					<table>
						<tbody>
							{
								items.map((item, index) => (
									<tr key={index} data-index={index}>
										<td className='item' onClick={this.onMenuItemClick}>{item.text}</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	private onMenuDivBlur = () => {
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	};

	private onMenuItemClick = (event: MouseEvent<HTMLTableCellElement>) => {
		if (this.props.onItemClick) {
			event.stopPropagation();
			if (event.currentTarget.parentElement) {
				const itemIndex: number = Number(event.currentTarget.parentElement.getAttribute('data-index'));
				const item = items[itemIndex];
				this.props.onItemClick(item);
			}
		}
	};
}