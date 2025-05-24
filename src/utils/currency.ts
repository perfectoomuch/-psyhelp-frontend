const currency = (number: number) => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
	}).format(number)
}

export default currency
