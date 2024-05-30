export default function DateTimeDisplay(utcDateTimeString: string) {
	// Convert the UTC date string to a Date object
	const utcDate = new Date(utcDateTimeString);

	// Format the date to local time string
	const localDateString = utcDate.toLocaleString();

	return localDateString;
}
