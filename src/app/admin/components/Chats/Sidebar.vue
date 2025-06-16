<template>
	<div class="flex flex-col">
		<div class="flex items-center gap-2 p-4 h-[73px] border-b-[1px]">
			<h1 class="text-2xl font-semibold">Диалоги</h1>
		</div>
		<div v-if="dialogs.length > 0" class="p-2">
			<input
				type="text"
				class="input focus:outline-none bg-gray-100 rounded-lg"
				placeholder="Поиск: id, username, имя, фамилия"
				v-model="search"
			/>
		</div>
		<div class="flex-1 overflow-y-scroll flex flex-col gap-2 px-2 max-h-full">
			<div
				v-if="getSearch.length === 0"
				class="flex items-center justify-center flex-1 text-center text-sm flex-col px-5 leading-none gap-2"
			>
				<Icon name="Frown" :size="44" class="text-primary" />
				<span class="opacity-65">
					<template v-if="dialogs.length === 0"
						>Нет активных диалогов, вернитесь позже</template
					>
					<template v-else>Диалог не найден</template>
				</span>
			</div>
			<template v-for="(item, index) in getSearch" :key="index">
				<div
					class="card bg-base-100 card-sm border cursor-pointer hover:bg-gray-100 group rounded-lg"
					@click="$emit('room', item.customer.id)"
				>
					<div class="card-body flex flex-row gap-2 items-center">
						<div
							class="min-w-12 h-12 rounded-full uppercase flex items-center justify-center bg-gray-100 border text-md font-semibold group-hover:bg-white"
						>
							<template v-if="item.customer.username">
								{{ Array.from(item.customer.username)[0] }}
							</template>
							<template v-else>-</template>
						</div>
						<div class="flex flex-col w-[calc(100%-52px)] gap-0.5">
							<div class="flex justify-between">
								<span class="font-medium">
									{{ item.customer.first_name }}
									{{ item.customer.last_name }}
								</span>
								<a
									:href="`https://t.me/${item.customer.username}`"
									class="text-primary"
								>
									@{{ item.customer.username }}
								</a>
							</div>
							<p class="truncate">
								Сообщение:
								{{ item.last?.message }}
							</p>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: ['dialogs'],
	data: () => ({
		search: '',
	}),
	computed: {
		getSearch() {
			let result = []
			if (this.search.trim().length === 0) {
				result = this.dialogs
			} else {
				result = this.dialogs.filter(
					el =>
						el.customer.id == this.search ||
						el.customer.username.includes(this.search) ||
						`${el.customer.first_name.toLowerCase()} ${el.customer.last_name.toLowerCase()}`.includes(
							this.search.toLowerCase()
						)
				)
			}

			return result.filter(el => el.customer !== null)
		},
	},
}
</script>
