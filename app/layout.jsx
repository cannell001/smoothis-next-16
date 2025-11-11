import Link from 'next/link'
import './globals.css'

export const metadata = {
    title: 'Supa Smoothies',
    description: 'Track, create, and update smoothie recipes with Supabase + Next.js 16.',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/icon?family=Material+Icons'
                />
            </head>
            <body>
                <nav>
                    <h1>Supa Smoothies</h1>
                    <Link href='/'>Home</Link>
                    <Link href='/create'>Create New Smoothie</Link>
                </nav>
                {children}
            </body>
        </html>
    )
}
