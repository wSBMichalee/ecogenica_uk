import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { HeroVideoComponent } from '@/blocks/HeroVideo/Component'
import { AudienceSplitComponent } from '@/blocks/AudienceSplit/Component'
import { ClimateRangeComponent } from '@/blocks/ClimateRange/Component'
import { BentoFeaturesComponent } from '@/blocks/BentoFeatures/Component'
import { ProductLineupComponent } from '@/blocks/ProductLineup/Component'
import { RefrigerantCompareComponent } from '@/blocks/RefrigerantCompare/Component'
import { ProcessStepsComponent } from '@/blocks/ProcessSteps/Component'
import { GrantCheckerComponent } from '@/blocks/GrantChecker/Component'
import { TestimonialsSliderComponent } from '@/blocks/TestimonialsSlider/Component'
import { FaqAccordionComponent } from '@/blocks/FaqAccordion/Component'
import { CtaBandComponent } from '@/blocks/CtaBand/Component'
import { ProductHeroComponent } from '@/blocks/ProductHero/Component'
import { ProductSpecsTabComponent } from '@/blocks/ProductSpecsTab/Component'
import { ProductSliderComponent } from '@/blocks/ProductSlider/Component'
import { BenefitsGridComponent } from '@/blocks/BenefitsGrid/Component'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams

  if (!slug) {
    return { title: 'Air Source Heat Pumps Installed from £3,500* | Ecogenica UK' }
  }

  const p = slug[0]

  if (p === 'support') return { title: 'Ecogenica Heat Pump Warranty and Product Registration' }
  if (p === 'about' || p === 'about-us') return { title: 'About Ecogenica UK' }
  if (p === 'contact') return { title: 'Contact Ecogenica UK' }
  if (p === 'quote' || p === 'get-a-quote') return { title: 'Get Your Fixed Heat Pump Price' }
  if (p === 'installers') return { title: 'R290 Heat Pump Supplier for UK Installers' }
  if (p === 'boiler-upgrade-scheme') return { title: 'Boiler Upgrade Scheme 2026: Up to £9,000 Grant' }
  if (p === 'heat-pump-cost') return { title: 'Air Source Heat Pump Cost UK: Price After the Grant' }
  if (p === 'running-costs') return { title: 'Heat Pump Running Costs: Calculator and Real Figures' }
  if (p === 'heat-pump-vs-gas-boiler') return { title: 'Heat Pump vs Gas Boiler: Costs, Comfort and Grants' }
  if (p === 'oil-lpg-boiler-replacement') return { title: 'Replace Your Oil or LPG Boiler with a Heat Pump' }
  if (p === 'how-it-works') return { title: 'Heat Pump Installation: What Happens, Step by Step' }
  if (p === 'faq') return { title: 'Heat Pump FAQ | Ecogenica UK' }
  if (p === 'blog') return { title: 'Blog - Ecogenica Heat Pumps' }

  if (p === 'product' || p === 'products' || p === 'heat-pumps') {
    if (slug.length > 1) {
      const pageType = slug[1]
      if (pageType === 'outback') return { title: 'R290 Air Source Heat Pumps, 5–16 kW | Outback Range' }
      if (pageType === 'wallaroo') return { title: 'Outdoor Heat Pump with Built-in Cylinder – Wallaroo' }
      
      const match = pageType.match(/outback-(\d+)kw/)
      if (match) {
        return { title: `${match[1]}kW Air Source Heat Pump – Outback Range` }
      }
      return { title: `${pageType} | Ecogenica UK` }
    }
    return { title: 'R290 Air Source Heat Pumps, 5–16 kW | Outback Range' }
  }

  return { title: 'Ecogenica UK' }
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams

  if (slug && slug[0] === 'support') {
    return <SupportPage />
  }

  if (slug && (slug[0] === 'about' || slug[0] === 'about-us')) {
    return <AboutPage />
  }

  if (slug && slug[0] === 'contact') {
    return <ContactPage />
  }

  if (slug && (slug[0] === 'quote' || slug[0] === 'get-a-quote')) {
    return <QuotePage />
  }

  if (slug && slug[0] === 'installers') {
    return <InstallersPage />
  }

  if (slug && slug[0] === 'boiler-upgrade-scheme') {
    return <BoilerUpgradeSchemePage />
  }

  if (slug && slug[0] === 'heat-pump-cost') {
    return <HeatPumpCostPage />
  }

  if (slug && slug[0] === 'running-costs') {
    return <RunningCostsPage />
  }

  if (slug && slug[0] === 'heat-pump-vs-gas-boiler') {
    return <HeatPumpVsGasBoilerPage />
  }

  if (slug && slug[0] === 'oil-lpg-boiler-replacement') {
    return <OilLpgReplacementPage />
  }

  if (slug && slug[0] === 'how-it-works') {
    return <HowItWorksPage />
  }

  if (slug && slug[0] === 'faq') {
    return <FaqPage />
  }

  if (slug && slug[0] === 'blog') {
    if (slug.length === 1) {
      return <BlogIndexPage />
    } else {
      return <BlogPostPage slug={slug[1]} />
    }
  }

  if (slug && (slug[0] === 'product' || slug[0] === 'products' || slug[0] === 'heat-pumps')) {
    if (slug.length > 1) {
      const pageType = slug[1]
      if (pageType === 'outback') {
        return <OutbackOverviewPage />
      }
      if (pageType === 'wallaroo') {
        return <WallarooOverviewPage />
      }
      return <IndividualProductPage model={pageType} />
    }

    return (
      <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center uppercase">Outback R290 air source heat pumps (5–16 kW)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/en/products/outback" className="group rounded-3xl bg-gray-50 p-8 border border-gray-100 hover:border-[#CDDC94] hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold mb-4 uppercase group-hover:text-[#57703C]">Outback Range</h2>
            <p className="text-lg text-gray-600">The R290 Monobloc Air Source Heat Pump designed for the UK climate.</p>
          </Link>
          <Link href="/en/products/wallaroo" className="group rounded-3xl bg-gray-50 p-8 border border-gray-100 hover:border-[#CDDC94] hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold mb-4 uppercase group-hover:text-[#57703C]">Wallaroo</h2>
            <p className="text-lg text-gray-600">The innovative all-in-one integrated Heat Pump and Cylinder (Coming Soon).</p>
          </Link>
        </div>
      </div>
    )
  }



  return (
    <div className="flex flex-col min-h-screen">
      <HeroVideoComponent
        heading="Air source heat pumps, installed from £3,500 with the £7,500 grant*"
        subheading="MCS-certified R290 air source heat pumps for UK homes. Radiators included, fixed price, up to 8-year warranty. Check your grant and price in 60 seconds."
        posterImage={{ url: '/hero_section.png' } as any}
        ctaLabel="GET A QUOTE"
        ctaSecondaryLabel="Explore the Outback range"
      />
      
      <AudienceSplitComponent
        heading="Who are you looking for?"
        homeownerLabel="For Homeowners"
        homeownerTarget={1 as any}
        installerLabel="For Installers"
        installerTarget={2 as any}
      />
      
      <BenefitsGridComponent
        heading="Does it work in a British winter?"
        subheading="Designed for homeowners who want reliable, affordable, future-proof heating."
        benefits={[
          {
            iconName: 'Snowflake',
            title: 'BUILT FOR EXTREME CONDITIONS',
            description: 'Tested in harsh Australian climates, including freezing regions — so cold UK winters are a breeze.',
          },
          {
            iconName: 'Flame',
            title: 'PROVEN TO REDUCE HEATING COSTS',
            description: 'High-efficiency R290-based systems built to maximise tariff savings and reduce energy use.',
          },
          {
            iconName: 'LayoutGrid',
            title: 'WIDE RANGE OF OPTIONS',
            description: 'Units sized for small homes, large families, and everything in between.',
          },
          {
            iconName: 'Award',
            title: 'FULLY MCS-ACCREDITED',
            description: 'Essential for grant eligibility and meeting UK compliance standards.',
          },
          {
            iconName: 'Gift',
            title: 'BUS GRANT-READY',
            description: 'Our heat pumps are eligible for the Boiler Upgrade Scheme, reducing upfront costs dramatically.',
          },
          {
            iconName: 'UserCog',
            title: 'INSTALLED BY ACCREDITED PROFESSIONALS',
            description: 'We partner with approved installers only — with training, support and rapid turnaround times.',
          },
          {
            iconName: 'Users',
            title: 'TRUSTED BY THOUSANDS',
            description: 'Ecogenica is a preferred manufacturer in Australia with 250,000+ installations supported through our partner network.',
          }
        ]}
      />
      
      <ClimateRangeComponent
        heading="Tested for UK winters"
        temperatureValue={-15}
        temperatureUnit="°C"
        ctaLabel="CHECK YOUR ELIGIBILITY"
        ctaTarget="/quote"
      />
      
      <BentoFeaturesComponent
        heading="Key features that matter."
        features={[
          { title: 'Boiler Upgrade Scheme ready', description: 'Qualifies for the £7,500 government grant.', icon: 'PoundSterling', size: 'normal' },
          { title: 'Natural refrigerant R290', description: 'Ultra-low GWP of 3, future-proofing your home.', icon: 'Leaf', size: 'normal' },
          { title: 'SCOP rating A+++', description: 'Maximum efficiency for lower running costs.', icon: 'Zap', size: 'normal' },
          { title: 'Low noise operation', description: 'Quietly keeps your home warm without disturbing the neighbors.', icon: 'VolumeX', size: 'large' },
        ]}
      />

      <ProductLineupComponent
        heading="Which size suits your home?"
        subheading="Engineered for efficiency, built for the UK climate."
        products={[
          {
            id: '1',
            name: 'Outback 200 Series',
            description: 'Compact, powerful, and perfect for the average UK home.',
            imageUrl: 'https://ecogenica.co.uk/residential-hot-water-hero.jpg',
            features: ['Up to 8kW output', 'Ultra-quiet mode', 'Smart app control'],
            href: '/products/outback-200'
          },
          {
            id: '2',
            name: 'Outback 290 Series',
            description: 'Maximum capacity for larger homes with high hot water demand.',
            imageUrl: 'https://ecogenica.co.uk/454891.png',
            features: ['Up to 12kW output', 'Advanced weather compensation', 'Cascade ready'],
            href: '/products/outback-290'
          }
        ]}
      />

      <RefrigerantCompareComponent
        heading="The Natural Choice"
        subheading="We use R290 (propane), a natural refrigerant with a Global Warming Potential (GWP) of just 3. It's safe, highly efficient, and completely future-proof against F-gas regulations."
      />

      <ProcessStepsComponent
        heading="How installation works"
        subheading="From enquiry to installation, we make upgrading your heating simple."
        steps={[
          { number: '1', title: 'Free Survey', description: 'We assess your property to ensure a heat pump is the right fit.' },
          { number: '2', title: 'Custom Design', description: 'Our engineers design a bespoke system tailored to your heat loss.' },
          { number: '3', title: 'Installation', description: 'Our certified team installs your Outback system in 2-3 days.' },
          { number: '4', title: 'Grant & Support', description: 'We process your £7,500 BUS grant and provide ongoing maintenance.' },
        ]}
      />

      <GrantCheckerComponent
        heading="What a heat pump costs after the grant"
        subheading="Check if your postcode qualifies for the Boiler Upgrade Scheme."
        grantAmount="£7,500"
      />

      <TestimonialsSliderComponent
        heading="What UK customers say"
        badgeImage="https://ecogenica.co.uk/g-review.svg"
        testimonials={[
          {
            id: '1',
            authorName: 'Reinier Claus',
            authorLocation: 'UK',
            quote: 'Very good service and product. Friendly staff and quick responses. It\'s a rare thing these days to get the level of service this company offers and gives. Keep it up 👍',
            rating: 5,
          },
          {
            id: '2',
            authorName: 'Geoff O\'Callaghan',
            authorLocation: 'UK',
            quote: 'We had the team from Ecogenica come and install a heat pump based hot water heater. The experience was seamlessly fantastic, from first contact to installation. Highly recommended.',
            rating: 5,
          },
          {
            id: '3',
            authorName: 'Doug Nichols',
            authorLocation: 'UK',
            quote: 'Great service and a great product. Uses under a quarter of my previous HWS power, and I only run it during the day when my solar panels are making power — so free hot water!',
            rating: 5,
          },
          {
            id: '4',
            authorName: 'Sarah Jenkins',
            authorLocation: 'Australia',
            quote: 'Fantastic investment. Since getting the Ecogenica heat pump installed last year, our energy bills have plummeted. The unit is incredibly quiet and looks very neat outside.',
            rating: 5,
          },
          {
            id: '5',
            authorName: 'Mark Robertson',
            authorLocation: 'Australia',
            quote: 'Top quality product and the installation team was very professional. They left the place spotless and explained exactly how to use the app to control the hot water settings.',
            rating: 5,
          },
          {
            id: '6',
            authorName: 'Eleanor Smith',
            authorLocation: 'Australia',
            quote: 'Couldn\'t be happier with our new heat pump. Living in a colder region we were worried about performance in winter, but it hasn\'t skipped a beat even on the freezing mornings.',
            rating: 5,
          },
          {
            id: '7',
            authorName: 'David Chen',
            authorLocation: 'Australia',
            quote: 'I did a lot of research before choosing Ecogenica. Their R290 refrigerant technology was a big selling point for me. Highly efficient and better for the environment.',
            rating: 5,
          }
        ]}
      />

      <FaqAccordionComponent
        heading="Questions homeowners ask"
        subheading="Everything you need to know about heat pumps and the Boiler Upgrade Scheme."
        faqs={[
          {
            id: '1',
            question: 'Will a heat pump work in the winter?',
            answer: 'Yes. Outback heat pumps are specifically designed for the UK climate and are guaranteed to operate efficiently in temperatures as low as -15°C.'
          },
          {
            id: '2',
            question: 'How do I know if my property is suitable?',
            answer: 'Most properties are suitable, provided they have basic insulation. Our free survey will confirm your eligibility and exact heat loss requirements.'
          },
          {
            id: '3',
            question: 'How does the £7,500 grant work?',
            answer: 'The Boiler Upgrade Scheme (BUS) provides £7,500 upfront off the cost of installation. We handle all the paperwork for you, so you only pay the remaining balance.'
          }
        ]}
      />

      <CtaBandComponent
        heading="Ready to upgrade your home?"
        subheading="Book a free, no-obligation survey today and secure your £7,500 grant before funds run out."
        ctaLabel="Get Started"
        ctaTarget={1 as any}
        theme="primary"
      />
    </div>
  )
}

function IndividualProductPage({ model }: { model: string }) {
  const modelNameMap: Record<string, string> = {
    'outback-5kw': 'Outback 5kW',
    'outback-8kw': 'Outback 8kW',
    'outback-11kw': 'Outback 11kW',
    'outback-16kw': 'Outback 16kW',
    'outback-200': 'Outback 200 Series',
    'outback-290': 'Outback 290 Series',
  }
  
  const title = modelNameMap[model] || model.replace('-', ' ').toUpperCase()
  
  return (
    <div className="flex flex-col min-h-screen">
      <HeroVideoComponent
        heading={`Outback ${title.split(' ')[1] || title} air source heat pump`}
        subheading={`The ${title} is designed specifically for the UK climate, providing reliable heating and hot water even at extreme temperatures down to -15°C. It features the eco-friendly R290 natural refrigerant, exceptionally quiet operation, and is fully compatible with the £7,500 Boiler Upgrade Scheme.`}
        posterImage={{ url: 'https://ecogenica.co.uk/454891.png' } as any}
        ctaLabel="GET A QUOTE"
        ctaTarget={1 as any}
      />

      <BenefitsGridComponent
        heading="What size home it suits"
        benefits={[
          { title: 'A+++ ENERGY RATING', description: 'Maximum efficiency for lower energy bills.', iconName: 'Zap' },
          { title: 'ULTRA LOW GWP', description: 'R290 refrigerant with a GWP of just 3.', iconName: 'Leaf' },
          { title: 'WHISPER QUIET', description: 'Advanced acoustic enclosure minimizes noise.', iconName: 'VolumeX' },
          { title: 'APP CONTROL', description: 'Manage your heating remotely via Wi-Fi.', iconName: 'Wifi' },
        ]}
      />
      <div className="py-20 px-4 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase mb-12 text-center">Full specifications & Heat output at −7°C</h2>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h3 className="text-xl font-bold mb-6">Dimensions and clearances</h3>
            <p className="text-gray-600 mb-8">The exact physical dimensions and required clearance zones around the outdoor unit.</p>
            <h3 className="text-xl font-bold mb-6">Noise</h3>
            <p className="text-gray-600 mb-8">Acoustic data and sound pressure levels measured at various distances.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 uppercase">Manuals and downloads</h3>
              <p className="text-gray-600 mb-4">Download the installation manual, user guide, and technical data sheets.</p>
              <button className="text-[#57703C] font-bold hover:underline">Download PDF →</button>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 uppercase">Warranty</h3>
              <p className="text-gray-600 mb-4">Details on the standard and extended warranty options available for this model.</p>
              <button className="text-[#57703C] font-bold hover:underline">Read Warranty Terms →</button>
            </div>
          </div>
        </div>
      </div>
      
      <CtaBandComponent
        heading={`Interested in the ${title}?`}
        subheading="Contact our team today to check compatibility and receive a personalized quote."
        ctaLabel="GET A QUOTE"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Ecogenica heat pump warranty and product registration</h1>
      <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
        Everything you need to keep your Ecogenica system running perfectly. Register your warranty, download manuals, or contact our technical team.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Warranty Registration</h3>
          <p className="text-gray-600 mb-6">Register your new heat pump to activate your extended warranty coverage.</p>
          <button className="text-[#57703C] font-bold hover:underline">Register Now →</button>
        </div>
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Manuals & Guides</h3>
          <p className="text-gray-600 mb-6">Download user manuals, installation guides, and technical specifications.</p>
          <button className="text-[#57703C] font-bold hover:underline">Browse Library →</button>
        </div>
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Technical Support</h3>
          <p className="text-gray-600 mb-6">Need help? Our UK-based support team is ready to assist you.</p>
          <Link href="/en/contact" className="text-[#57703C] font-bold hover:underline">Contact Support →</Link>
        </div>
      </div>
      
      <FaqAccordionComponent
        heading="Common Support Questions"
        faqs={[
          {
            id: '1',
            question: 'How do I connect my heat pump to Wi-Fi?',
            answer: 'You can connect your heat pump using the Ecogenica App. Go to settings, select "Add Device", and follow the on-screen instructions to pair your system with your home network.'
          },
          {
            id: '2',
            question: 'What is the standard warranty period?',
            answer: 'Ecogenica heat pumps come with a standard 5-year warranty, covering parts and labor, provided the system is registered within 30 days of installation by an approved installer.'
          },
          {
            id: '3',
            question: 'How often does my heat pump need servicing?',
            answer: 'To maintain efficiency and keep your warranty valid, we recommend an annual service by a qualified engineer.'
          }
        ]}
      />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">About Ecogenica UK: heat pump manufacturer and installer</h1>
      <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
        Australia's #1 Heat Pump Manufacturer, now bringing ultra-efficient, low-carbon heating to the UK.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="rounded-3xl overflow-hidden h-[400px] relative">
          <div className="absolute inset-0 bg-[#57703C] flex items-center justify-center text-white p-12">
            <h2 className="text-4xl font-bold leading-tight">250,000+<br/><span className="text-2xl font-normal opacity-80">Installations Worldwide</span></h2>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 uppercase">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            At Ecogenica, our mission is simple: to make sustainable, low-cost heating accessible to everyone. We design and manufacture advanced air source heat pumps that dramatically reduce carbon emissions and energy bills.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With over 250,000 successful installations in Australia, we've perfected our technology to operate flawlessly in extreme conditions. Now, we've engineered the Outback range specifically for the UK climate, utilizing the natural R290 refrigerant.
          </p>
        </div>
      </div>
      
      <CtaBandComponent
        heading="Join the green revolution"
        subheading="Ready to reduce your carbon footprint and save on energy bills?"
        ctaLabel="VIEW OUR PRODUCTS"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Contact Ecogenica UK</h1>
      <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
        Have a question about our heat pumps, installation, or the Boiler Upgrade Scheme? We're here to help.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-8 uppercase">Get in touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-600"><a href="tel:+441164830473" className="hover:text-[#57703C]">+44 116 483 0473</a></p>
                <p className="text-sm text-gray-500">Mon-Fri, 9am - 5pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">info@ecogenica.co.uk</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#EFF1E3] text-[#57703C] rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Office</h3>
                <p className="text-gray-600">Ecogenica UK Ltd<br/>Atherstone<br/>United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C]" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C]" placeholder="Your email address" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Message</label>
              <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-[#CDDC94] text-black font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-[#57703C] hover:text-white transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Get your fixed heat pump price in 60 seconds</h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Find out how much you can save with an Ecogenica heat pump. It takes just 2 minutes to check your eligibility for the £7,500 grant.
      </p>
      
      <div className="w-full max-w-3xl bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-center py-20">
        <h2 className="text-2xl font-bold mb-6">[ Spruce Embedded Form Placeholder ]</h2>
        <p className="text-gray-500 mb-8">The interactive Spruce quote flow will be embedded here.</p>
        <button className="bg-[#57703C] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider">Start Quote Example</button>
      </div>
    </div>
  )
}

function InstallersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 px-4 pb-20 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">R290 monobloc heat pumps for UK installers</h1>
      <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
        Join our network of approved UK installers. Get access to exclusive pricing, comprehensive training, and priority technical support.
      </p>
      
      <BenefitsGridComponent
        heading="Why install Ecogenica?"
        benefits={[
          { title: 'EASY TO INSTALL', description: 'Monobloc design with comprehensive UK-specific manuals reduces time on site.', iconName: 'Wrench' },
          { title: 'DEDICATED SUPPORT', description: 'Direct access to our UK technical team for troubleshooting and advice.', iconName: 'PhoneCall' },
          { title: 'TRAINING PROGRAM', description: 'Free comprehensive training at our UK facility for all partner installers.', iconName: 'GraduationCap' },
          { title: 'R290 TECHNOLOGY', description: 'Stay ahead of the curve with our future-proof natural refrigerant heat pumps.', iconName: 'Leaf' }
        ]}
      />
      
      <CtaBandComponent
        heading="Become an Approved Installer"
        subheading="Register your interest today and our partnership team will be in touch."
        ctaLabel="REGISTER INTEREST"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function OutbackOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductHeroComponent
        heading="Outback R290 air source heat pumps (5–16 kW)"
        paragraphs={[
          'The Outback is Ecogenica’s R290 Monobloc DC Inverter Multi-Purpose Air Source Heat Pump range which has been designed from the ground up to meet the cold weather requirements of UK homes with an effective operating range from -15°C to +40 °C ambient temperature.',
          'The Outback range utilises the natural refrigerant R290 and so has a low environmental impact with a Global Warming Potential of just 3 (compared to 675 for Heat Pumps using the refrigerant R32) and has a SCOP of 4.5 or above with an ErP rating of A+++ at A7/W35.',
          'Ecogenica also offers Hot Water Cylinders and Accessories to ensure that installations are easy and quick, thereby saving time and money.',
          'The Outback range is MCS certified and so eligible for UK Government funding under the Boiler Upgrade Scheme.'
        ]}
        imageUrl="https://ecogenica.co.uk/product-group-units.jpg"
      />

      <div className="pt-20 pb-8 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold uppercase mb-4">Compare every model</h2>
        <p className="text-gray-600">Full specifications across the entire Outback range.</p>
      </div>
      <ProductSpecsTabComponent
        models={[
          {
            name: 'Outback 5kW',
            specs: [
              { label: 'Model', value: 'ECO-ZR02FC' },
              { label: 'SCOP (w/w) at 35°C', value: '5.10' },
              { label: 'ERP Level', value: 'A+++' },
              { label: 'Refrigerant Type', value: 'R290' },
              { label: 'Wi-Fi Enabled', value: 'YES' },
              { label: 'Heating Capacity Range (kW)', value: '2.5~7.5' },
              { label: 'Noise dB(A)', value: '59.08' }
            ],
            imageUrl: 'https://ecogenica.co.uk/454891.png',
            brochureUrl: 'https://ecogenica.co.uk/OutBackFlyer/Outback_Flyer_ProductPage.pdf'
          },
          {
            name: 'Outback 8kW',
            specs: [
              { label: 'Model', value: 'ECO-ZR03FC' },
              { label: 'SCOP (w/w) at 35°C', value: '4.85' },
              { label: 'ERP Level', value: 'A+++' },
              { label: 'Refrigerant Type', value: 'R290' },
              { label: 'Wi-Fi Enabled', value: 'YES' },
              { label: 'Heating Capacity Range (kW)', value: '3.5~10.0' },
              { label: 'Noise dB(A)', value: '61.2' }
            ],
            imageUrl: 'https://ecogenica.co.uk/454891.png',
            brochureUrl: 'https://ecogenica.co.uk/OutBackFlyer/Outback_Flyer_ProductPage.pdf'
          },
          {
            name: 'Outback 11kW',
            specs: [
              { label: 'Model', value: 'ECO-ZR04FC' },
              { label: 'SCOP (w/w) at 35°C', value: '4.8' },
              { label: 'ERP Level', value: 'A+++' },
              { label: 'Refrigerant Type', value: 'R290' },
              { label: 'Wi-Fi Enabled', value: 'YES' },
              { label: 'Heating Capacity Range (kW)', value: '4.5~12.0' },
              { label: 'Noise dB(A)', value: '63.5' }
            ],
            imageUrl: 'https://ecogenica.co.uk/454891.png',
            brochureUrl: 'https://ecogenica.co.uk/OutBackFlyer/Outback_Flyer_ProductPage.pdf'
          }
        ]}
      />

      <ProductLineupComponent
        heading="Which size do I need?"
        subheading="Engineered for efficiency, built for the UK climate."
        products={[
          {
            id: '1',
            name: 'Outback 200 Series',
            description: 'Compact, powerful, and perfect for the average UK home.',
            imageUrl: 'https://ecogenica.co.uk/residential-hot-water-hero.jpg',
            features: ['Up to 8kW output', 'Ultra-quiet mode', 'Smart app control'],
            href: '/products/outback-200'
          },
          {
            id: '2',
            name: 'Outback 290 Series',
            description: 'Maximum capacity for larger homes with high hot water demand.',
            imageUrl: 'https://ecogenica.co.uk/454891.png',
            features: ['Up to 12kW output', 'Advanced weather compensation', 'Cascade ready'],
            href: '/products/outback-290'
          }
        ]}
      />
      <div className="pt-20 px-4 text-center">
        <h2 className="text-3xl font-bold uppercase mb-4">Do heat pumps work in cold weather?</h2>
      </div>
      <ClimateRangeComponent
        heading="Tested down to -15°C"
        temperatureValue={-15}
        temperatureUnit="°C"
        ctaLabel="FIND OUT MORE"
        ctaTarget="/faq"
      />

      <div className="pt-20 px-4 text-center">
        <h2 className="text-3xl font-bold uppercase mb-4">R290 vs R32: why the refrigerant matters</h2>
      </div>
      <RefrigerantCompareComponent
        heading="The Natural Choice"
        subheading="Why we use R290 instead of R32 or other older refrigerants."
      />

      <BenefitsGridComponent
        heading="Monobloc vs split"
        subheading="Why the Outback's monobloc design is better for UK homes."
        benefits={[
          { title: 'No F-Gas Required', description: 'Faster, cheaper installation as all refrigerant is sealed outside.', iconName: 'Wrench' },
          { title: 'Space Saving', description: 'No bulky indoor unit taking up valuable space.', iconName: 'Home' }
        ]}
      />

      <CtaBandComponent
        heading="Ready to switch to sustainable heating?"
        subheading="Book a free consultation and find out how much you can save with Ecogenica."
        ctaLabel="GET A QUOTE"
        ctaTarget={1 as any}
        theme="primary"
      />
    </div>
  )
}

function WallarooOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductSliderComponent
        heading="Wallaroo: heat pump and hot water cylinder in one outdoor unit"
        paragraphs={[
          'Soon to be launched in the UK, Ecogenica is excited to announce the development of the first integrated Heat Pump and Cylinder that will be located outside the homeowner’s property.',
          'By removing the need for a Hot Water Cylinder to be inside the house, this innovative range will save space thus enabling many homes, previously unable to have a Heat Pump, to now install a Heat Pump system. As an all-in-one unit, the Wallaroo will also further simplify the installation process, saving time and money.',
          'To request further information, please CONTACT US.'
        ]}
        images={[
          'https://ecogenica.co.uk/WallarooFlyer-product.png',
          'https://ecogenica.co.uk/WallarooFlyer-product2.png',
          'https://ecogenica.co.uk/WallarooFlyer-product3.png'
        ]}
        brochureUrl="https://ecogenica.co.uk/Wallaroo_Flyer.pdf"
      />

      <BenefitsGridComponent
        heading="Explore the benefits of Wallaroo"
        benefits={[
          { title: 'ALL-IN-ONE DESIGN', description: 'Combines heat pump and cylinder in a single outdoor unit, saving valuable indoor space.', iconName: 'Box' },
          { title: 'QUICK INSTALLATION', description: 'Dramatically reduces installation time and complexity by removing indoor cylinder requirements.', iconName: 'Clock' },
          { title: 'WEATHER RESISTANT', description: 'Built to withstand extreme UK weather conditions while maintaining efficiency.', iconName: 'CloudRain' },
          { title: 'COMING SOON', description: 'Join our waiting list to be the first to know when Wallaroo arrives in the UK.', iconName: 'Bell' }
        ]}
      />

      <CtaBandComponent
        heading="Interested in the Wallaroo?"
        subheading="Contact us to join the waiting list or get more information."
        ctaLabel="CONTACT US"
        ctaTarget={1 as any}
        theme="primary"
      />
    </div>
  )
}

function BoilerUpgradeSchemePage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Boiler Upgrade Scheme: the £7,500 heat pump grant, explained</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Who qualifies for the Boiler Upgrade Scheme, how much you get (£7,500, or £9,000 for oil and LPG homes) and how your installer applies.
        </p>
      </div>

      <GrantCheckerComponent
        heading="How much is the grant?"
        subheading="Check your postcode to see if you qualify for the £7,500 Boiler Upgrade Scheme."
        grantAmount="£7,500"
      />

      <FaqAccordionComponent
        heading="Who is eligible?"
        subheading="Find out if your property and current heating system qualify."
        faqs={[
          { id: '1', question: 'Do I need an EPC?', answer: 'Yes, you need a valid Energy Performance Certificate with no outstanding recommendations for loft or cavity wall insulation.' },
          { id: '2', question: 'Is the scheme still open?', answer: 'Yes, the Boiler Upgrade Scheme is fully funded and active. We can process your application immediately.' },
          { id: '3', question: 'How to apply?', answer: 'You don’t have to do anything. Your MCS-certified installer applies for the grant on your behalf and the discount is deducted from your final bill.' },
          { id: '4', question: 'Landlords and the grant', answer: 'Yes, private landlords and second home owners are eligible for the grant, provided they meet the basic EPC requirements.' }
        ]}
      />
      
      <CtaBandComponent
        heading="Check your eligibility today"
        subheading="Find out instantly if you qualify for the Boiler Upgrade Scheme and get a free quote."
        ctaLabel="GET A FREE QUOTE"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function HeatPumpCostPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">How much does an air source heat pump cost?</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          What an air source heat pump costs in the UK, what's included (radiators, cylinder, installation) and what you pay after the £7,500 grant.
        </p>
      </div>
      
      <BenefitsGridComponent
        heading="What's included"
        benefits={[
          { title: 'The Heat Pump', description: 'Your high-efficiency Ecogenica R290 unit.', iconName: 'Box' },
          { title: 'New Radiators', description: 'Upgraded radiators where required to maximize efficiency.', iconName: 'LayoutGrid' },
          { title: 'Hot Water Cylinder', description: 'A compatible hot water cylinder if needed.', iconName: 'Database' },
          { title: 'Full Installation', description: 'MCS-certified installation, commissioning, and handover.', iconName: 'Wrench' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 w-full py-16">
        <h2 className="text-3xl font-bold mb-8 text-center uppercase">What changes the price?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-3">Do I need new radiators?</h3>
            <p className="text-gray-600">Often, standard radiators are too small to emit enough heat at the lower flow temperatures of a heat pump. We evaluate your current setup and include necessary radiator upgrades in your quote.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-3">Property size & insulation</h3>
            <p className="text-gray-600">Larger or poorly insulated homes require a larger capacity heat pump (e.g., 11kW or 16kW), which increases the base cost compared to a smaller 5kW unit.</p>
          </div>
        </div>
      </div>

      <CtaBandComponent
        heading="Typical price after the grant*"
        subheading="Our heat pump installations start from just £3,500 after the £7,500 grant is applied."
        ctaLabel="Get your fixed price"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function RunningCostsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">What does a heat pump cost to run?</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Estimate your heat pump running costs against gas, oil or LPG. Uses SCOP from MCS test data and current UK energy prices.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 w-full mb-16">
        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 uppercase">Running cost calculator</h2>
          <p className="text-gray-600 mb-8">This interactive tool will be integrated here to show exact comparisons based on Ofgem price caps.</p>
          <button className="btn-primary">
            Calculate your savings
          </button>
        </div>
      </div>

      <FaqAccordionComponent
        heading="Heat pump vs gas: cost per kWh of heat"
        subheading="Understanding efficiency and energy tariffs."
        faqs={[
          { id: '1', question: 'What SCOP means for your bill', answer: 'Seasonal Coefficient of Performance (SCOP) measures efficiency across the whole year. A SCOP of 4.5 means for every 1kW of electricity used, you get 4.5kW of heat. This bridges the gap between electricity and gas prices.' },
          { id: '2', question: 'Best tariffs for heat pumps', answer: 'Specialized heat pump tariffs or time-of-use tariffs (like Octopus Agile or Cosy) can significantly lower your running costs by offering cheaper electricity during off-peak hours.' },
          { id: '3', question: 'How to cut running costs', answer: 'Properly balancing your radiators, using weather compensation, and improving home insulation will ensure your heat pump runs at its maximum efficiency.' }
        ]}
      />
      
      <CtaBandComponent
        heading="Start saving on your energy bills"
        subheading="Contact us today for a full heat loss calculation and running cost estimate."
        ctaLabel="BOOK A SURVEY"
        ctaTarget={1 as any}
        theme="dark"
      />
    </div>
  )
}

function HeatPumpVsGasBoilerPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Heat pump vs gas boiler: which is right for your home?</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Compare the upfront costs, running costs, comfort, and environmental impact of upgrading your gas boiler to an air source heat pump.
        </p>
      </div>
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Upfront cost after the grant</h2>
              <p className="text-lg text-gray-600 mb-4">While a gas boiler typically costs £2,000–£3,500 to install, a heat pump installation can cost £10,500 or more. However, with the £7,500 Boiler Upgrade Scheme grant, the cost of installing a heat pump (from £3,500) becomes extremely competitive with a new boiler.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Running costs</h2>
              <p className="text-lg text-gray-600 mb-4">Gas is cheaper per unit than electricity, but heat pumps are up to 400-500% efficient compared to a boiler's 90%. This high efficiency, combined with special heat pump electricity tariffs, means your running costs will often be lower or on par with gas.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Comfort and how heat feels different</h2>
              <p className="text-lg text-gray-600 mb-4">Boilers blast high heat for short periods, creating temperature spikes. Heat pumps run continuously at lower temperatures, maintaining a constant, comfortable warmth throughout your home 24/7 without cold drafts.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Lifespan and servicing</h2>
              <p className="text-lg text-gray-600 mb-4">A typical gas boiler lasts 10–15 years, whereas a high-quality heat pump can last 15–20 years. Both require annual servicing to maintain efficiency and validate their warranties.</p>
            </div>
          </div>
        </div>
      </div>

      <BenefitsGridComponent
        heading="When a heat pump isn't the right choice"
        subheading="There are cases where a gas boiler might still make more sense."
        benefits={[
          { title: 'Space needed', description: 'Heat pumps require outdoor space and often an indoor hot water cylinder.', iconName: 'Home' },
          { title: 'Poor insulation', description: 'If your home is very poorly insulated (e.g., single glazing, no loft insulation), a heat pump will struggle to keep it warm efficiently.', iconName: 'Wind' }
        ]}
      />

      <CtaBandComponent
        heading="Find out if your home is suitable"
        subheading="Book a free, no-obligation survey and get a guaranteed quote."
        ctaLabel="START YOUR QUOTE"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function OilLpgReplacementPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Replace your oil or LPG boiler with a heat pump, with up to £9,000 off</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Off the gas grid? Swap oil or LPG for an R290 heat pump. Eligible homes get a £9,000 Boiler Upgrade Scheme grant until 31 March 2027.
        </p>
      </div>

      <BenefitsGridComponent
        heading="The £9,000 grant for off-gas homes"
        subheading="Why upgrading makes financial sense."
        benefits={[
          { title: 'Enhanced £9,000 grant', description: 'Homes off the gas grid are eligible for an increased grant amount.', iconName: 'PoundSterling' },
          { title: 'Lower running costs', description: 'Heat pumps are typically much cheaper to run than oil or LPG.', iconName: 'TrendingDown' },
          { title: 'No more fuel deliveries', description: 'Forget about scheduling oil deliveries or monitoring tank levels.', iconName: 'Truck' },
          { title: 'Reclaim your garden', description: 'Remove the unsightly oil tank and free up space.', iconName: 'Home' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Rural and older homes</h2>
            <p className="text-lg text-gray-600 mb-6">Many off-grid properties are older or rural. Our R290 high-temperature heat pumps can output water up to 75°C, making them an excellent drop-in replacement for oil boilers even if your home isn't perfectly insulated.</p>
            <h2 className="text-3xl font-bold mb-6">What happens to the oil tank?</h2>
            <p className="text-lg text-gray-600">As part of your installation, we can arrange for the safe removal and disposal of your old oil tank, freeing up valuable space in your garden.</p>
          </div>
          <div className="bg-[#EFF1E3] p-10 rounded-[3rem]">
            <h3 className="text-2xl font-bold mb-4 text-[#57703C]">Heat pump vs oil: running costs</h3>
            <p className="text-lg mb-6">Oil prices fluctuate wildly. A heat pump runs on electricity and is incredibly efficient. By switching to an EV or Heat Pump tariff, you can lock in lower energy prices and insulate yourself from fossil fuel price shocks.</p>
            <button className="btn-primary w-full shadow-lg">Check Savings Calculator</button>
          </div>
        </div>
      </div>

      <CtaBandComponent
        heading="Ditch the oil deliveries"
        subheading="See if your off-grid home qualifies for the £9,000 grant today."
        ctaLabel="GET YOUR QUOTE"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">How heat pump installation works</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          From the initial survey to handover, here is exactly what happens when you choose Ecogenica for your heat pump installation.
        </p>
      </div>

      <div className="bg-gray-50 py-16 mb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Is my home suitable?</h2>
          <p className="text-lg text-gray-600 mb-8">Most UK homes are suitable for a heat pump, provided they have adequate insulation and outdoor space. If you have an EPC rating of D or above and space outside for a unit roughly the size of a washing machine, you are likely a perfect candidate.</p>
          <button className="btn-primary">Check Suitability in 60s</button>
        </div>
      </div>
      
      <ProcessStepsComponent
        heading="Step by step process"
        subheading="We handle everything, from design to grant applications."
        steps={[
          { number: '1', title: 'Survey and heat loss design', description: 'Our engineers accurately calculate your home\'s heating requirements room-by-room to size the pump and radiators perfectly.' },
          { number: '2', title: 'Planning permission and where the unit goes', description: 'Most installations fall under Permitted Development. We will help you choose the quietest, most discreet location for the outdoor unit.' },
          { number: '3', title: 'Installation day', description: 'Our MCS-certified team arrives. We drain the old system, install the new cylinder, mount the heat pump, and upgrade radiators if required. It usually takes 2-4 days.' },
          { number: '4', title: 'Commissioning and handover', description: 'We thoroughly test the system, ensure it runs at peak efficiency, and show you exactly how to use your new smart controls.' },
          { number: '5', title: 'Aftercare', description: 'You are protected by our comprehensive warranty and dedicated UK support team. We also offer annual servicing to keep your pump running smoothly.' }
        ]}
      />

      <CtaBandComponent
        heading="Ready to get started?"
        subheading="Book your free, no-obligation home survey today."
        ctaLabel="BOOK SURVEY"
        ctaTarget={1 as any}
      />
    </div>
  )
}

function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center uppercase">Heat Pump FAQ</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about air source heat pumps, installation, costs, and the Boiler Upgrade Scheme.
        </p>
      </div>
      
      <FaqAccordionComponent
        heading="Common Questions"
        subheading="Answers to the most frequent questions from our customers."
        faqs={[
          { id: '1', question: 'Do heat pumps work in old houses?', answer: 'Yes, with proper insulation (like loft and cavity wall) and correctly sized radiators, heat pumps are highly effective in older properties.' },
          { id: '2', question: 'Do I need new radiators for a heat pump?', answer: 'Often, some radiators may need to be upgraded to larger sizes to operate efficiently at the lower flow temperatures of a heat pump. We evaluate this during our survey and include any necessary upgrades in our quote.' },
          { id: '3', question: 'Are heat pumps noisy?', answer: 'Modern heat pumps like the Ecogenica Outback are incredibly quiet. They operate at around 60 dB(A) — similar to the volume of a quiet conversation. From a few meters away, you will barely hear it.' },
          { id: '4', question: 'How long does a heat pump last?', answer: 'With regular annual servicing, a quality air source heat pump can last 15-20 years, making it a highly durable heating solution.' },
          { id: '5', question: 'Does a heat pump heat hot water?', answer: 'Yes, air-to-water heat pumps provide both central heating and domestic hot water when paired with a compatible unvented hot water cylinder.' },
          { id: '6', question: 'What is the heat pump flow temperature?', answer: 'Our R290 heat pumps can achieve flow temperatures up to 75°C, meaning they can function similarly to a traditional boiler, though running them at lower temperatures (35-45°C) is much more efficient.' },
          { id: '7', question: 'What happens during a heat pump defrost cycle?', answer: 'In cold weather, ice can form on the outdoor unit. The heat pump will automatically reverse its cycle for a few minutes to melt this ice (the defrost cycle). This is normal operation and ensures the unit continues to run efficiently.' }
        ]}
      />

      <CtaBandComponent
        heading="Still have questions?"
        subheading="Our UK-based team is ready to help."
        ctaLabel="CONTACT SUPPORT"
        ctaTarget={1 as any}
        theme="dark"
      />
    </div>
  )
}

function BlogIndexPage() {
  const posts = getAllPosts()
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--ink-50,#f8fafc)]">
      <HeroVideoComponent
        heading="Ecogenica Guides & Blog"
        subheading="Expert advice, industry news, and complete guides on air source heat pumps for UK homeowners."
        posterImage={{ url: 'https://ecogenica.co.uk/residential-hot-water-hero.jpg', alt: 'Ecogenica Blog' }}
        ctaLabel="VIEW ALL GUIDES"
        ctaTarget="#guides"
      />

      <div id="guides" className="max-w-7xl mx-auto px-4 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.meta.slug} href={`/en/blog/${post.meta.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center p-8">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C2517] to-[#57703C] opacity-90"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
                <h3 className="text-white text-2xl font-bold z-10 text-center leading-tight">{post.meta.title}</h3>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#57703C] bg-[#EFF1E3] px-3 py-1 rounded-full">{post.meta.category?.replace(/-/g, ' ')}</span>
                  <span className="text-xs text-gray-500">{post.meta.lastReviewedAt}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#57703C] transition-colors line-clamp-2">{post.meta.title}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm">{post.meta.excerpt}</p>
                <div className="mt-auto font-semibold text-[#57703C] group-hover:underline text-sm uppercase tracking-wide">
                  Read guide &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)
  
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen pt-40 pb-20 items-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The guide you are looking for does not exist.</p>
        <Link href="/en/blog" className="btn-primary">Return to Blog</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white pb-24">
      {/* Blog Hero */}
      <div className="bg-[#1C2517] text-white pt-40 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(205,220,148,0.1)_0%,transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 border border-white/20 mb-8">
            <span className="text-xs font-bold text-[#CDDC94] uppercase tracking-wider">{post.meta.category?.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">{post.meta.h1}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{post.meta.excerpt}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 w-full -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-8 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Author:</span> {post.meta.author || 'Ecogenica Team'}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Updated:</span> {post.meta.lastReviewedAt}
            </div>
          </div>

          {post.meta.keyTakeaways && post.meta.keyTakeaways.length > 0 && (
            <div className="bg-[#EFF1E3] rounded-2xl p-8 mb-12">
              <h3 className="text-lg font-bold mb-4 text-[#1C2517] uppercase tracking-wider">Key Takeaways</h3>
              <ul className="space-y-3">
                {post.meta.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex gap-3 text-gray-800">
                    <svg className="w-6 h-6 text-[#57703C] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose prose-lg prose-green max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
