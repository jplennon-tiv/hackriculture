import type { Metadata } from "next";
import { Header, Footer } from "@/components/site/chrome";
import site from "@/data/site.json";
import "./globals.css";
export const metadata:Metadata={title:{default:"Hackriculture — Grow more. Make more. Live well.",template:"%s | Hackriculture"},description:site.description,icons:{icon:site.logo}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><Header/>{children}<Footer/></body></html>}
