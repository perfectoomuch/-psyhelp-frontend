import { http } from '@/plugins/axios'
import { push } from 'notivue'

const upload = async (file: any) => {
	try {
		const formData = new FormData()
		formData.append('file', file)

		const res = await http.post('upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		push.success('Файл загружен')
		return res.data.filename
	} catch (err) {
		console.log(err)
		push.error('Ошибка при загрузке файла')
	}
}

export default upload
