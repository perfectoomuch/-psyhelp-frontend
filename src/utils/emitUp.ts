// utils/emitUp.js
export function emitUp(component: any, methodName: any, payload: any) {
	let parent = component.$parent

	while (parent) {
		const handler = parent.$options?.methods?.[methodName]
		if (typeof handler === 'function') {
			const result = handler.call(parent, payload)
			// поддержка async-методов
			return Promise.resolve(result)
		}
		parent = parent.$parent
	}

	return Promise.reject(
		new Error(`Родитель с методом "${methodName}" не найден`)
	)
}
