import '../styles/main.css';
import { Metadata } from 'next';
import {Open_Sans} from 'next/font/google';
import Header from '../components/Header';

const open_sans = Open_Sans({subsets: ['latin']})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="!scroll-smooth h-full">
            <body className={`${open_sans.className} h-full text-white flex flex-col bg-[#252525]`}>
                <Header />
                <main className='pt-28 px-6 lg:px-8'>{children}</main>
            </body>
        </html>
    );
}

//Todo: Need to upload new files
export const metadata: Metadata = {
    title: 'MDX Notes App',
    icons: {
        icon: './icon.png',
    },
    openGraph: {
        title: 'MDX Notes App',
        description: 'Create Notes using MDX and share it to world',
        url: 'https://next-mdx-blog-app.vercel.app/',
        siteName: 'MDX Notes App',
        images: [
            {
                url: 'https://tidytreat.ca/preview.png',
                width: 800,
                height: 600,
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
};
