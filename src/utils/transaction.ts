export const status = (val?: string) => {
	const obj = {
		failed: 'Провален',
		canceled: 'Отменен',
		pending: 'Ожидается оплата',
		success: 'Оплачено',
		refunded: 'Возврат',
	}

	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getStatusByValue = null
	if (val) {
		getStatusByValue = list.find(el => el.value === val)
	}

	return {
		obj,
		list,
		getStatusByValue,
	}
}
