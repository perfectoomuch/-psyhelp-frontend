const currency = (number: number) => {
	// return new Intl.NumberFormat('ru-RU', {
	// 	style: 'currency',
	// 	currency: 'RUB',
	// }).format(number)
	return new Intl.NumberFormat('ru-RU').format(number) + ' ₽'
}

export default currency
