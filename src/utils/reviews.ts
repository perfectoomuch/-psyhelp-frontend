export const status = (val?: string | string[]) => {
	const obj = {
		moderation: 'На модерации',
		approved: 'Опубликовано',
		failed: 'Провален',
	}

	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getStatusByValue = null
	if (!Array.isArray(val)) {
		getStatusByValue = list.find(el => el.value === val)
	}
	if (Array.isArray(val)) {
		getStatusByValue = list.filter(el => val.includes(el.value))
	}

	return {
		obj,
		list,
		getStatusByValue,
	}
}
