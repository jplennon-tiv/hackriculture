import type { Metadata } from "next";
import { Header, Footer } from "@/components/site/chrome";
import site from "@shared/website/site.json";
import "./globals.css";
import "./harvest.css";
import "./harvest-interiors.css";
export const metadata:Metadata={title:{default:"Hackriculture — Growing guides & practical self-sufficiency",template:"%s | Hackriculture"},description:site.description,icons:{icon:site.logo}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><Header/>{children}<Footer/></body></html>}
