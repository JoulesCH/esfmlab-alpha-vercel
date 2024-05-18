"use client";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'

export default function Layout({ children }) {
  return (
    <html>
        <head>
          <link
              href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
              rel="stylesheet"
          />
            <title>E S F Mlab</title>
        </head>
        <body className="bg-[#d6e2e2] h-screen">
          
        <header>
          <Navbar />
        </header>
              {children}

        <Footer />   
        </body>
    </html>
  )
}