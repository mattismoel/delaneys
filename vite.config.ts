import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs"

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		https: {
			key: readFileSync(`${__dirname}/cert/key.pem`),
			cert: readFileSync(`${__dirname}/cert/cert.pem`)
		},
		proxy: {}
	}
});
