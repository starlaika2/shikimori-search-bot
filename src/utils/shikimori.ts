import type { input as Input, output as Output } from 'zod/v4'
import { Query } from '#/shikimori/schema'
import type { Primitive } from '#/types'

type BaseFields = {
	[field: string]: true | BaseFields | undefined
}

type Select<T> = T extends Primitive
	? true
	: T extends (infer R)[]
		? Select<R>
		: { [K in keyof T]?: Select<NonNullable<T[K]>> } & {}

type Selected<T, F> = T extends (infer R)[]
	? Selected<R, F>[]
	: {
			[K in keyof T as K extends keyof F ? K : never]: K extends keyof F
				? F[K] extends true
					? T[K]
					: Selected<T[K], F[K]>
				: never
		} & {}

type VariableObject<
	S extends keyof typeof Query,
	V extends keyof Input<(typeof Query)[S]['parameters']>,
> = {
	[K in V]: Input<(typeof Query)[S]['parameters']>[K]
} & {}

const API_URL = 'https://shikimori.io/api/graphql'

export class ShikimoriRequestError extends Error {
	constructor(
		message: string,
		readonly query: string,
		readonly variables?: unknown,
	) {
		super(message)
	}
}

export function shikimori<
	S extends keyof typeof Query,
	P extends Input<(typeof Query)[S]['parameters']>,
	O extends Output<(typeof Query)[S]['returns']>,
	F extends Select<O>,
	V extends (keyof Input<(typeof Query)[S]['parameters']>)[] | undefined = undefined,
	T = Selected<O, F>,
	R = T,
>(
	scope: S,
	opts: {
		variables?: V
		parameters?: P
		fields: F
		transform?: (data: T) => R
	},
): (
	...args: V extends null ? [] : [variables: VariableObject<S, NonNullable<V>[number]>]
) => Promise<R> {
	const vars = unpackVars(scope, opts.variables as string[])
	const params = unpackParams(scope, opts.variables as string[], opts.parameters)
	const fields = unpackFields(opts.fields)
	const query = `query${vars}{${scope}${params}${fields}}`

	return async (...[variables]) => {
		const res = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'user-agent': 'shikimori-search-bot/1.0',
			},
			body: JSON.stringify(variables ? { query, variables } : { query }),
		})

		const raw = await res.json()
		if ('errors' in raw) {
			throw new ShikimoriRequestError(raw.errors[0].message, query)
		}

		const data = raw.data[scope]
		return (opts.transform ?? (data => data))(data) as R
	}
}

function unpackVars<S extends keyof typeof Query>(scope: S, variables?: string[]) {
	const { types } = Query[scope]
	const vars: string[] = []

	if (variables != null) {
		for (const name of variables) {
			vars.push(`$${name}:${types[name as never]}`)
		}
	}

	return vars.length > 0 ? `(${vars.join(',')})` : ''
}

function unpackParams<S extends keyof typeof Query>(
	scope: S,
	variables?: string[],
	parameters?: Record<string, unknown>,
) {
	const { types } = Query[scope]
	const params: string[] = []

	if (variables != null) {
		for (const name of variables) {
			params.push(`${name}:$${name}`)
		}
	}

	if (parameters != null) {
		for (const name in parameters) {
			if ((types[name as never] as string).endsWith('Enum')) {
				params.push(`${name}:${parameters[name]}`)
			} else {
				params.push(`${name}:${JSON.stringify(parameters[name])}`)
			}
		}
	}

	return params.length > 0 ? `(${params.join(',')})` : ''
}

function unpackFields(fields: BaseFields) {
	const a: string[] = []

	for (const key in fields) {
		if (fields[key] == null) continue

		if (fields[key] === true) {
			a.push(key)
		} else {
			a.push(key + unpackFields(fields[key]))
		}
	}

	return `{${a.join(' ')}}`
}
