import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Footer from "../components/layout/footer/Footer";
import Navbar from "../components/layout/navbar/Navbar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | Home",
    template: "BookNook | %s",
  },
  description:
    "Discover well-loved classics and new treasures at the BookNook, your neighborhood bookshop online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
