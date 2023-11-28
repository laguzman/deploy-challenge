import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

import BootstrapClient from '@/components/BootstrapClient.js';

const montserrat = Montserrat({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Note App',
  description: 'Note App',
}

export default function RootLayout({ children }) {

  return (
      <html lang="es">
      <body className={montserrat.className}>{children}</body>
      <BootstrapClient />
      </html>
  )
}