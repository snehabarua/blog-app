import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ViewTransitions } from "next-view-transitions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Blog App",
  description: "Add blogs to your website",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer position="top-center" />

          <AuthProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                    <Footer />
                  </div>
                </div>
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
