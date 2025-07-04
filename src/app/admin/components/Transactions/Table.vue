<template>
	<div class="overflow-x-auto">
		<table class="table table-sm">
			<thead>
				<tr>
					<th class="font-medium">ID</th>
					<th class="font-medium">Клиент</th>
					<th class="font-medium">Специалист</th>
					<th class="font-medium">Касса</th>
					<th class="font-medium">Статус</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in data" :key="index">
					<td>
						{{ $dayjs(item.created_at).format('DD-MM-YYYY HH:mm:ss') }} <br />
						<span class="text-xs opacity-55">{{ item.id }}</span>
					</td>
					<td>
						<template v-if="item.customer">
							<router-link
								class="text-primary"
								:to="`/admin/dashboard/chats?customer=${item.customer.id}`"
							>
								{{ item.customer.username }}
							</router-link>
						</template>
						<template>-</template>
					</td>
					<td>
						<template v-if="item.specialist">
							<router-link
								class="text-primary"
								:to="`/admin/dashboard/specialists/${item.specialist.id}`"
							>
								{{ item.specialist?.first_name }}
								{{ item.specialist?.last_name }}
							</router-link>
						</template>
						<template>-</template>
					</td>
					<td>
						{{ item.gateway }}
					</td>
					<td>
						<span :class="getOneStatus(item.status)">
							{{ status(item.status).getStatusByValue.name }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { status } from '@/utils/transaction'
import { getOneStatusByValue } from '@/utils/allStatus'

export default {
	props: ['data'],
	components: {
		Popover,
		PopoverContent,
		PopoverTrigger,
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	},
	data: () => ({
		status,
		getOneStatusByValue,
	}),
	methods: {
		getOneStatus(status) {
			const find = this.getOneStatusByValue(status)
			if (find) return find.class
			return ''
		},
	},
}
</script>
