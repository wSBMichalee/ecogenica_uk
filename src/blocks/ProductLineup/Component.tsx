import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface ProductMock {
  id: string
  name: string
  description: string
  imageUrl: string
  features: string[]
  href: string
}

export interface ProductLineupProps {
  heading: string
  subheading?: string
  products: ProductMock[]
}

export function ProductLineupComponent({
  heading,
  subheading,
  products,
}: ProductLineupProps) {
  return (
    <section className="bg-white text-black py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl text-black/60 max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col rounded-3xl bg-[var(--ink-50,#f8fafc)] p-8 transition-shadow hover:shadow-2xl">
              <div className="relative w-full aspect-square md:aspect-[4/3] mb-8 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-8">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
                <p className="text-black/60 mb-6 flex-1">{product.description}</p>
                <ul className="mb-8 space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                      <div className="h-2 w-2 rounded-full bg-[var(--ipal-primary,#16a34a)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#CDDC94] text-black px-6 py-3 font-semibold transition-colors hover:bg-[#57703C] hover:text-white"
                >
                  View Details
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
