import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	private globalLogLevel: LogLevel = LogLevel.INFO;

	constructor() {
		if (isDevMode()) {
			this.globalLogLevel = LogLevel.ALL;
		}
	}

	public debug(msg: any) {
		if (this.canLog(LogLevel.DEBUG)) {
			console.log(msg);
		}
	}

	public info(msg: any) {
		if (this.canLog(LogLevel.INFO)) {
			console.log(msg);
		}
	}

	public warn(msg: any) {
		if (this.canLog(LogLevel.WARN)) {
			console.warn(msg);
		}
	}

	public error(msg: any) {
		if (this.canLog(LogLevel.ERROR)) {
			console.error(msg);
		}
	}

	/**
	 * Is the app configured to log messages of the given severity
	 */
	private canLog(logLevel: LogLevel) {
		return logLevel >= this.globalLogLevel;
	}
}

export enum LogLevel {
	ALL = 0,
	DEBUG = 1,
	INFO = 2,
	WARN = 3,
	ERROR = 4,
	OFF = 99
}
