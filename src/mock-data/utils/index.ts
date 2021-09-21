export const randomInt = (max: number, min = 0): number => {
	if (!max || typeof max !== 'number') {
		return 0;
	}
	return Math.floor(Math.random() * max) + min;
};

export const createRange = (length: number): number[] => {
	const range: number[] = [];
	while (range.length < length) range.push(range.length);
	return range;
};

export const randomFloat = (max: number, min = 0, precision = 1): number => {
	if (!max || typeof max !== 'number') {
		return 0;
	}
	return parseFloat((Math.random() * max + min).toFixed(precision));
};
export const pickRandom = <T>(origin: T[]): T | null =>
	origin?.length ? origin[randomInt(origin.length)] : null;

export const randomDuration = (
	max: number,
	min: number,
) => {
	const length = randomInt(max, min);
	return `${length} ${pickRandom(['week', 'month'])}${length !== 1 ? 's' : ''}`;
};
export const createDynamicList = <T>(
	length: number,
	contentGenerator: () => T
): T[] => {
	const arr = new Array(length).fill(null);
	return arr.map(() => contentGenerator());
};

export const randomOrNull = <T>(arg: T): T | null =>
	Math.random() > 0.5 ? arg : null;

export const pickMany = (origin: any[], amount = 1) => {
	if (!origin || !origin.length || amount < 1) return [];
	let selectables = createRange(origin.length);
	let i = 0;
	const elements: Set<string> = new Set();
	while (i < selectables.length && i < amount) {
		const index = Math.floor(selectables.length * Math.random());
		elements.add(origin[selectables[index]]);
		selectables = selectables.filter((_, i) => i !== index);
		i++;
	}
	return Array.from(elements);
};
