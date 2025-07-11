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

export const gender = (val?: string) => {
	const obj = {
		female: 'Женщина',
		male: 'Мужчина',
	}
	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getGenderByValue = null
	if (val) getGenderByValue = list.find(el => el.value === val)

	return {
		obj,
		list,
		getGenderByValue,
	}
}

export const profession = (val?: string | string[]) => {
	const obj = {
		psychologist: 'Психолог',
		psychotherapist: 'Психотерапевт',
		coach: 'Коуч',
	}

	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getProfessionByValue = null
	if (!Array.isArray(val)) {
		getProfessionByValue = list.find(el => el.value === val)
	}
	if (Array.isArray(val)) {
		getProfessionByValue = list.filter(el => val.includes(el.value))
	}

	return {
		obj,
		list,
		getProfessionByValue,
	}
}

export const route = (val?: string | string[]) => {
	const obj = {
		adult: 'Для себя',
		child: 'Для ребенка',
		couple: 'Для пары',
		supervision: 'Супервизор',
	}

	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getRouteByValue = null
	if (!Array.isArray(val)) {
		getRouteByValue = list.find(el => el.value === val)
	}
	if (Array.isArray(val)) {
		getRouteByValue = list.filter(el => val.includes(el.value))
	}

	return {
		obj,
		list,
		getRouteByValue,
	}
}

export const religion = (val?: string) => {
	const obj = {
		islam: 'Ислам',
		christianity: 'Христианство',
		buddhism: 'Буддизм',
		judaism: 'Иудаизм',
	}

	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getReligionByValue = null
	if (val) getReligionByValue = list.find(el => el.value === val)

	return {
		obj,
		list,
		getReligionByValue,
	}
}

export const ethnic = (val?: string) => {
	const obj = {
		yes: 'Да',
		no: 'Нет',
	}
	const list = Object.entries(obj).map(el => ({ value: el[0], name: el[1] }))
	let getEthnicByValue = null
	if (val) getEthnicByValue = list.find(el => el.value === val)

	return {
		obj,
		list,
		getEthnicByValue,
	}
}
