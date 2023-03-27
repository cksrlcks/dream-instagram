import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={openSans.className}>
            <body>
                <AuthContext>
                    <Navbar />
                    <div className="max-w-screen-xl mx-auto py-4 px-4">
                        {children}
                    </div>
                </AuthContext>
            </body>
        </html>
    );
}
