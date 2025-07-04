const statusList = [
	{
		value: 'in_agreement',
		name: 'В согласовании',
		class: 'text-yellow-600',
	},
	{
		value: 'cancelled',
		name: 'Отменено',
		class: 'text-red-600',
	},
	{
		value: 'confirmed',
		name: 'Подтверждено',
		class: 'text-blue-600',
	},
	{
		value: 'failed',
		name: 'Провален',
		class: 'text-red-600',
	},
	{
		value: 'canceled',
		name: 'Отменен',
		class: 'text-gray-900',
	},
	{
		value: 'pending',
		name: 'Ожидается оплата',
		class: 'text-yellow-600',
	},
	{
		value: 'success',
		name: 'Оплачено',
		class: 'text-green-600',
	},
	{
		value: 'refunded',
		name: 'Возврат',
		class: 'text-red-600',
	},
]

export const getOneStatusByValue = (val: string) => {
	const find = statusList.find(el => el.value === val)
	if (find) return find
}
