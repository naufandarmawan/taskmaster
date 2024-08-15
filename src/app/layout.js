import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "TaskMaster",
  description: "Task Management App built with full-stack Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
