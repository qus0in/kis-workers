export function getDateAndHour(): string {
	return new Date().toUTCString().slice(0, 13);
}

export function keyMaps(env: Env) {
	const akMap = new Map<string, string>();
	const skMap = new Map<string, string>();
	akMap.set('63691813', env['ak-63691813']);
	skMap.set('63691813', env['sk-63691813']);
	akMap.set('64033412', env['ak-64033412']);
	skMap.set('64033412', env['sk-64033412']);
	akMap.set('69393152', env['ak-69393152']);
	skMap.set('69393152', env['sk-69393152']);
	return [akMap, skMap];
}

export function accountMaps() {
	const cdMap = new Map<string, string>();
	const categoryMap = new Map<string, number>();
	cdMap.set('63691813', '22');
	categoryMap.set('63691813', 1);
	cdMap.set('64033412', '22');
	categoryMap.set('64033412', 1);
	cdMap.set('69393152', '01');
	categoryMap.set('69393152', 2);
	return [cdMap, categoryMap];
}
