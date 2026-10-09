import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/en" className="flex items-center gap-2">
          <Image
            src="https://ecogenica.co.uk/Logo-transparent.png"
            alt="Ecogenica UK"
            width={240}
            height={80}
            className="h-12 w-auto md:h-16"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/en" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors">
            Home
          </Link>
          
          <div className="group/products relative">
            <Link href="/en/products" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors flex items-center gap-1">
              Products
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/products:rotate-180">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </Link>
            <div className="absolute top-full left-0 mt-6 w-48 rounded-xl bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/products:opacity-100 group-hover/products:visible transition-all duration-200 transform translate-y-2 group-hover/products:translate-y-0 overflow-hidden">
              <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
              <div className="flex flex-col py-2">
                <Link href="/en/products/outback" className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#EFF1E3] hover:text-[#57703C] transition-colors">
                  Outback
                </Link>
                <Link href="/en/products/wallaroo" className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#EFF1E3] hover:text-[#57703C] transition-colors">
                  Wallaroo
                </Link>
              </div>
            </div>
          </div>

          <Link href="/en/support" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors flex items-center gap-1">
            Service & Support
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </Link>
          <Link href="/en/about" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors">
            About Us
          </Link>
          <Link href="/en/blog" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors">
            Blog
          </Link>
          <Link href="/en/quote" className="text-sm font-semibold uppercase tracking-wider text-black hover:text-[#57703C] transition-colors">
            Online Quote
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/en/contact"
            className="btn-primary hidden md:inline-flex items-center text-sm py-2.5 px-6 uppercase tracking-wide"
          >
            Contact Us
          </Link>
          <button className="md:hidden text-[#57703C]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
