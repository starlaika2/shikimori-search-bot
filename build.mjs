import { rm } from 'node:fs/promises'
import { build } from 'esbuild'

await rm('dist', { recursive: true, force: true })

await build({
	entryPoints: ['src/main.ts'],
	outdir: 'dist',
	platform: 'node',
	format: 'esm',
	bundle: true,
	splitting: true,
	outExtension: { '.js': '.mjs' },
	banner: {
		js: [
			'import { createRequire } from "node:module";',
			'var require = createRequire(import.meta.dirname);',
		].join('\n'),
	},
})
