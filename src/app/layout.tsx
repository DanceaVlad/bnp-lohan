import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BNP Lohan",
    description: "Birou Notarial Lohan - Informații acte necesare",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={inter.variable} lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                    enableSystem
                >
                    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-xl shadow-sm">
                        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-3">
                            <Link
                                className="group flex flex-col items-center gap-1.5 transition-opacity hover:opacity-90"
                                href="/"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-6 bg-primary/30 group-hover:w-8 transition-all duration-300" />
                                    <h1 className="text-3xl font-bold text-foreground tracking-[0.05em]">
                                        BNP Lohan
                                    </h1>
                                    <div className="h-px w-6 bg-primary/30 group-hover:w-8 transition-all duration-300" />
                                </div>
                                <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mt-0.5">
                                    Birou Notarial Public
                                </p>
                            </Link>
                        </div>
                    </header>
                    <main className="flex-1 max-w-5xl mx-auto w-full pt-3 px-6 sm:px-24">
                        {children}
                    </main>

                    <footer className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-6">
                        <h2
                            className="text-2xl font-bold text-foreground tracking-[0.05em]"
                            //TODO: Add about content
                        >
                            Despre noi
                        </h2>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
