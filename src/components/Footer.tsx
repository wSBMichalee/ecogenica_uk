import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Image
              src="https://ecogenica.co.uk/Logo-transparent.png"
              alt="Ecogenica UK"
              width={200}
              height={70}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Australia's leading air source heat pump company now in the UK. Designed for efficiency, reliability, and extreme climates.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-[var(--ipal-primary,#16a34a)]">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/en" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/en/products" className="text-white/70 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/en/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/en/quote" className="text-white/70 hover:text-white transition-colors">Online Quote</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-[var(--ipal-primary,#16a34a)]">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/en/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/en/support" className="text-white/70 hover:text-white transition-colors">Service & Support</Link></li>
              <li><Link href="/en/warranty" className="text-white/70 hover:text-white transition-colors">Warranty Registration</Link></li>
              <li><Link href="/en/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-[var(--ipal-primary,#16a34a)]">Contact</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <span className="font-semibold text-white">Phone:</span>
                <a href="tel:+441164830473" className="hover:text-[var(--ipal-primary,#16a34a)] transition-colors">+44 116 483 0473</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold text-white">Availability:</span>
                7 days a week
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Ecogenica UK. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/en/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/en/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
