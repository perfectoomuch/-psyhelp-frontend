import { push } from 'notivue'
import * as yup from 'yup'

export const SpecialistSchema = async (data: any): Promise<boolean> => {
	const schema = yup.object({
		first_name: yup.string().required('Имя обязателен'),
		methods: yup
			.array()
			.of(yup.string().required())
			.min(1, 'Укажите хотя бы один метод'),
		experience_route: yup
			.array()
			.of(yup.string().required())
			.min(1, 'Укажите хотя бы одно направление'),
		experience_years: yup.string().required('Опыт работы обязателен'),
		photo: yup.string().required('Загрузите фотографию'),
		video: yup.string(),
		gender: yup.string().required('Выберите пол специалиста'),
		birth_year: yup.string().required('Год рождения обязателен'),
		price: yup.string().required('Стоимость сессии обязателен'),
		message: yup.string().required('Сообщение визитка обязателен'),
		education: yup.string().required('Образование обязателен'),
		profession: yup
			.array()
			.of(yup.string().required())
			.min(1, 'Укажите хотя бы одну профессию'),
		sessions: yup.string().required('Сессии обязателен'),
		experience_ethnic_group: yup
			.string()
			.required('Опыт с эт. группами обязателен'),
	})

	try {
		let response = await schema.validate(data, {
			abortEarly: false,
		})
		return true
	} catch (err: any) {
		err.errors.map((el: any) => push.error(el))
		return false
	}
}
