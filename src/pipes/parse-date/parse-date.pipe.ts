import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
	transform(value: string) {
		// console.log('Parsing date:', value);
		const date = new Date(value);

		if (isNaN(date.getTime())) {
			// console.log('Invalid date format');
			return null;
		}

		return date;
	}
}
