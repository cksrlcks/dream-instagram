import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";

// const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "instantgram",
        template: "instantgram | %s",
    },
    description: "instantgram photos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-zinc-100">
                <AuthContext>
                    <Navbar />
                    <div className="max-w-screen-xl mx-auto py-4 px-4">
                        <SWRConfigContext>{children}</SWRConfigContext>
                    </div>
                    <div id="portal"></div>
                </AuthContext>
            </body>
        </html>
    );
}
