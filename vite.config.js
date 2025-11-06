import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set the BROWSER environment variable (optional)
process.env.BROWSER = 'chrome'; // or 'google-chrome', depending on your OS


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Sets the server to run on port 3000
        open: true, // Automatically opens the browser when the server starts
    },
})
