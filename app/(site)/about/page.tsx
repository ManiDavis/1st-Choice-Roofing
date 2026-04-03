import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { TEAM_MEMBERS_QUERY, ALL_TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { CTASection } from '@/components/sections/CTASection'
import { Testimonials } from '@/components/sections/Testimonials'
import { breadcrumbSchema } from '@/lib/structured-data'
import { BUSINESS, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About 1st Choice Roofing — Webster, MA',
  description: 'Learn about 1st Choice Roofing — a locally-owned, licensed & insured roofing contractor in Webster, MA serving Worcester County. Two residential crews & one commercial crew.',
  alternates: { canonical: `${SITE_URL}/about` },
}

export default async function AboutPage() {
  const [team, testimonials] = await Promise.all([
    sanityFetch<any[]>({ query: TEAM_MEMBERS_QUERY, tags: ['teamMember'] }).catch(() => []),
    sanityFetch<any[]>({ query: ALL_TESTIMONIALS_QUERY, tags: ['testimonial'] }).catch(() => []),
  ])

  const schema = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <section className="bg-brand-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-5">
              Webster's Trusted Roofing Contractor
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              1st Choice Roofing is a locally-owned, fully licensed and insured roofing contractor based in Webster, MA. We serve Webster, Worcester, and the entire Worcester County area with dedicated residential and commercial roofing crews.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-brand-navy mb-5">Why We Started</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  1st Choice Roofing was built on a simple belief: homeowners and businesses in Massachusetts deserve a roofing contractor they can actually trust. No upsells, no surprises — just honest work, done right.
                </p>
                <p>
                  We&apos;re proud to be a local Webster, MA company. We know the area, we know the weather patterns that beat up Massachusetts roofs, and we know what it takes to build roofs that last.
                </p>
                <p>
                  With two dedicated residential crews and a separate commercial team, we can take on projects of any size without sacrificing quality or response time.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '500+', label: 'Roofs Completed', icon: '🏠' },
                { value: '5.0★', label: 'Google Rating', icon: '⭐' },
                { value: '3', label: 'Expert Crews', icon: '👷' },
                { value: '100%', label: 'Licensed & Insured', icon: '✅' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-display font-extrabold text-brand-gold">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-brand-navy mb-10 text-center">Our Credentials</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Licensed in Massachusetts', body: 'We hold all required state and local licences to operate as a roofing contractor in Massachusetts.', icon: '📋' },
              { title: 'Fully Insured', body: 'Full liability and workers compensation insurance on every job, protecting you and our team.', icon: '🛡️' },
              { title: '5-Star Reviews', body: `${BUSINESS.rating.count}+ verified Google reviews. We let our work speak for itself.`, icon: '⭐' },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 border border-gray-100 text-center shadow-sm">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-bold text-brand-navy mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-brand-navy mb-10 text-center">Meet the Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member._id} className="text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                    {member.photo?.asset?.url ? (
                      <Image src={member.photo.asset.url} alt={member.name} width={112} height={112} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-brand-navy/10">👷</div>
                    )}
                  </div>
                  <h3 className="font-bold text-brand-navy">{member.name}</h3>
                  {member.role && <p className="text-sm text-brand-gold mb-2">{member.role}</p>}
                  {member.bio && <p className="text-sm text-gray-600">{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Testimonials
          heading="What Our Customers Say"
          reviewCountLabel={`${BUSINESS.rating.count}+`}
          testimonials={testimonials}
        />
      )}

      <CTASection phone={BUSINESS.phone} heading="Ready to Work with Us?" subheading="Get your free, no-obligation estimate today." />
    </>
  )
}
