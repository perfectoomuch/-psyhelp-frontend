export const getProfession = (val: string) => {
	switch (val) {
		case 'psychologist':
			return 'Психолог'
		case 'psychotherapist':
			return 'Психотерапевт'
		case 'coach':
			return 'Коуч'
		default:
			break
	}
}

export const getRoute = (valArr: string[]) => {
	const route = (val: string) => {
		switch (val) {
			case 'adult':
				return 'взрослые'
			case 'child':
				return 'дети'
			case 'couple':
				return 'пары'
			case 'supervision':
				return 'супервизия'
			default:
				break
		}
	}
	return valArr.map(el => route(el)).join(', ')
}
