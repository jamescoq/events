export const createHashId = () => Math.random().toString(36).substr(2, 9);

export const getPosition = (options?: PositionOptions): Promise<GeolocationPosition> =>
	new Promise((resolve, reject) =>
		navigator.geolocation.getCurrentPosition(resolve, reject, options)
	);
