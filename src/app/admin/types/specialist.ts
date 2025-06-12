export const SpecialistProfessionEnum = {
	Psychologist: 'psychologist',
	Psychotherapist: 'psychotherapist',
	Coach: 'coach',
} as const

export type SpecialistProfessionEnum =
	(typeof SpecialistProfessionEnum)[keyof typeof SpecialistProfessionEnum]

export const SpecialistReligionEnum = {
	Islam: 'islam',
	Christianity: 'christianity',
	Buddhism: 'buddhism',
	Judaism: 'judaism',
} as const

export type SpecialistReligionEnum =
	(typeof SpecialistReligionEnum)[keyof typeof SpecialistReligionEnum]

export const SpecialistEthnicEnum = {
	Yes: 'yes',
	No: 'no',
} as const

export type SpecialistEthnicEnum =
	(typeof SpecialistEthnicEnum)[keyof typeof SpecialistEthnicEnum]

export const GenderEnum = {
	Female: 'female',
	Male: 'male',
} as const

export type GenderEnum = (typeof GenderEnum)[keyof typeof GenderEnum]

export const ExperienceRouteEnum = {
	ADULT: 'adult',
	CHILD: 'child',
	COUPLE: 'couple',
	SUPERVISION: 'supervision',
} as const

export type ExperienceRouteEnum =
	(typeof ExperienceRouteEnum)[keyof typeof ExperienceRouteEnum]

export type SpecialistBodyType = {
	first_name: string
	last_name: string
	email: string
	methods: string[]
	experience_route: ExperienceRouteEnum[]
	experience_years: string
	photo: string
	video?: string
	gender: GenderEnum
	birth_year: string
	price: string
	message: string
	education: string
	profession: SpecialistProfessionEnum[]
	religion: SpecialistReligionEnum
	experience_ethnic_group: SpecialistEthnicEnum
	sessions: string
}
