import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export function setupDayjs() {
	dayjs.extend(utc)
	dayjs.extend(timezone)
}
