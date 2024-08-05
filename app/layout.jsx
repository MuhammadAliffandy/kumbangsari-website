
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import AppNavbar from '@/app/components/appNavbar/appNavbar'
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kumbangsari",
  description: "Website Desa Kumbangsari",
};

export default function RootLayout({
  children,
}) {
  return (
        <html lang="en">
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
          </Head>
          <body className={`scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full`}>
            <link rel="icon" href="/images/icon/logo/planify.png" sizes="any"/>
            <StoreProvider>
              {children}
            </StoreProvider>
            <ToastContainer 
              autoClose={900}
            />
          </body>
        </html>

  );
}
