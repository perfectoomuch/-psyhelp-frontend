<template>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mb-10">Специалисты</h1>
		<form @submit.prevent="onSearch" class="flex gap-2">
			<label class="input border">
				<Icon name="Search" :size="16" />
				<input
					v-model="search.text"
					type="text"
					class="grow"
					placeholder="id, email, имя, фамилия"
				/>
			</label>
			<button class="btn">Поиск</button>
		</form>
	</div>
</template>

<script>
import { SpecialistService } from '../../services/specialist.service'
export default {
	data: () => ({
		specialistService: new SpecialistService(),
		loading: true,
		specialists: [],
	}),
}
</script>
