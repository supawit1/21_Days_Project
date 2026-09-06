import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '21_Days_Project', // ใส่ชื่อ Repository บน GitHub ที่ตั้งไว้
})