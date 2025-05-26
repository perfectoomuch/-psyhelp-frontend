export const getStatusList = [
	{
		value: 'in_agreement',
		name: 'В согласовании',
	},
	{
		value: 'cancelled',
		name: 'Отменено',
	},
	{
		value: 'confirmed',
		name: 'Подтверждено',
	},
]

export const getStatus = (status: string) => {
	switch (status) {
		case 'in_agreement':
			return 'В согласовании'
		case 'cancelled':
			return 'Отменено'
		case 'confirmed':
			return 'Подтверждено'
		default:
			break
	}
}
