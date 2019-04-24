import {EventEmitter, EventSubscription} from 'fbemitter';

/**
 * Специальный таймер, который генерирует событие tick каждый час.
 */
export default class HourlyTimer {
	private emitter = new EventEmitter();

	constructor() {
		window.setTimeout(this.setInterval.bind(this), HourlyTimer.getNextHourDelay());
	}

	/**
	 * Подписаться на события таймера. Доступно событие tick.
	 * @param eventType
	 * @param listener
	 * @param context
	 */
	public on(eventType: 'tick', listener: (activeHour: number) => void, context?: any): EventSubscription
	public on(eventType: string, listener: (...data: any[]) => void, context?: any): EventSubscription {
		return this.emitter.addListener(eventType, listener, context);
	}

	private setInterval() {
		this.onTick();
		window.setInterval(this.onTick.bind(this), 60 * 60 * 1000); // Интервал один час.
	}

	private onTick() {
		this.emitter.emit('tick', new Date().getHours());
	}

	/**
	 * Получить время до следующего часа в миллисекундах.
	 */
	private static getNextHourDelay(): number {
		const now = new Date();
		const nextHour = new Date(now.getTime());
		nextHour.setHours(nextHour.getHours() + 1);
		nextHour.setMinutes(0);
		nextHour.setSeconds(0);
		nextHour.setMilliseconds(0);
		return nextHour.getTime() - now.getTime();
	}
}