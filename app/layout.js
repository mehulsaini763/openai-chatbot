import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TensorBlue Chatbot",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="flex min-h-screen min-w-[1080px]">
          <Sidebar />
          <div className="flex flex-col w-full h-screen">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
