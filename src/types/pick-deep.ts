import type { Primitive } from './primitive'

type Head<T extends string> = T extends `${infer First}.${string}` ? First : T
type Tail<T extends string> = T extends `${string}.${infer Rest}` ? Rest : never

export type PickDeep<T, K extends string> =
	NonNullable<T> extends (infer R)[]
		? PickDeep<R, K>[] | Exclude<T, NonNullable<T>>
		: {
				[P in keyof T as P extends Head<K> ? P : never]: P extends string
					? NonNullable<T[P]> extends Primitive
						? T[P]
						: PickDeep<T[P], Tail<Extract<K, `${P}.${string}`>>>
					: never
			} & {}
