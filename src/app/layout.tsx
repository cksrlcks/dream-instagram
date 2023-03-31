"use client";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

// const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-zinc-100">
                <AuthContext>
                    <Navbar />
                    <div className="max-w-screen-xl mx-auto py-4 px-4">
                        <SWRConfigContext>{children}</SWRConfigContext>
                    </div>
                </AuthContext>
                <div id="portal" />
            </body>
        </html>
    );
}
