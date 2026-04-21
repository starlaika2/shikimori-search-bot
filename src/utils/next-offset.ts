import { INLINE_MAX_RESULTS } from '#/constants'

export function nextOffset(page: number, arr: unknown[]): string {
	return arr.length === INLINE_MAX_RESULTS ? `${page + 1}` : ''
}
