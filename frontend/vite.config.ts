import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
	},
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		tailwindcss(),
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
	],
})
